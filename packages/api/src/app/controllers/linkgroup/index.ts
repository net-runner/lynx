import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { validateLinkGroup } from '../../helpers/dataValidation';
import {
  createLinkGroup,
  deleteLinkGroupFromDatabase,
  editLinkGroupInDatabase,
  getLinkGroupFromDatabase,
  getLinkGroupsFromDatabase,
  incrementLinkGroupLinkedCount,
} from '../../services/linkGroup';
import {
  authorizedRouteHandler,
  ControllerMethodTypes,
  defaultRouteHandler,
} from '../../../interfaces';
import { Request } from 'hyper-express';
import { showSelectedObjectKeys } from '../../helpers/utilsJS';
import { LinkGroup } from '@prisma/client';
import { setExCache } from '../../helpers/redis';

class LinkGroupController {
  protected validateAndDestructureBody = async (
    req: Request,
    userId: string,
    actionType: ControllerMethodTypes
  ) => {
    const body = await req.json();
    const linkGroup = showSelectedObjectKeys(body, [
      'id',
      'name',
      'groupname',
      'description',
      'privacyLevel',
      'picture',
      'stars',
      'linkedCount',
      'watcherCount',
      'linksAmount',
    ]) as LinkGroup;
    linkGroup.owner = userId;

    log.info(linkGroup.id, linkGroup.name);
    const isGroupValidated = await validateLinkGroup(linkGroup, actionType);
    if (!isGroupValidated) return false;
    return linkGroup;
  };
  public add: authorizedRouteHandler = async (req, res) => {
    try {
      const user = res.locals.id.user;
      const linkGroup = await this.validateAndDestructureBody(
        req,
        user,
        ControllerMethodTypes.ADD
      );
      if (!linkGroup) return res.status(400).end();

      const createdLinkGroup = await createLinkGroup(linkGroup);
      if (!createdLinkGroup) return res.status(500).end();

      const discordWebhookBody = {
        title: `New link group added: ${linkGroup.name}`,
        description: `from user ${user}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json(createdLinkGroup);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public edit: authorizedRouteHandler = async (req, res) => {
    try {
      const user = res.locals.id.user;
      const linkGroup = await this.validateAndDestructureBody(
        req,
        user,
        ControllerMethodTypes.EDIT
      );
      if (!linkGroup) return res.status(400).end();

      const editedLinkGroup = await editLinkGroupInDatabase(
        linkGroup,
        linkGroup.id
      );
      if (!editedLinkGroup) return res.status(500).end();

      const discordWebhookBody = {
        title: `Link group has been edited`,
        description: `group id: ${linkGroup.id}`,
      };
      pushDiscordWebhook(discordWebhookBody);
      res.status(200).json(editedLinkGroup);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public delete: defaultRouteHandler = async (req, res) => {
    try {
      const body = await req.json();
      const { id } = body;
      log.info(id);

      const isGroupRemoved = await deleteLinkGroupFromDatabase(id);
      if (!isGroupRemoved) return res.status(404).end();

      const discordWebhookBody = {
        title: `Link group has been removed from db`,
        description: `link group id: ${id}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).end();
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public getSingle: defaultRouteHandler = async (req, res) => {
    try {
      const { id } = req.params;

      const linkGroupFromDb = await getLinkGroupFromDatabase(id);
      if (!linkGroupFromDb) return res.status(404).end();

      //Save record to redis
      const key = req.originalUrl;
      setExCache(key, 3600, JSON.stringify(linkGroupFromDb));

      const discordWebhookBody = {
        title: `GET link group from db: ${linkGroupFromDb.name}`,
        description: `link id: ${id}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json(linkGroupFromDb);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public getMany: defaultRouteHandler = async (req, res) => {
    try {
      const limit = parseInt(req.params.limit);
      const page = parseInt(req.params.page) || 0;
      const skip = parseInt(req.params.skip) || 0;
      const privacylevel = parseInt(req.params.privacylevel) || 0;
      const specificUsername = req.params.specificUsername;

      if (isNaN(limit)) return res.status(400).send('Limit has to be a number');
      if (limit > 50) return res.status(400).send('Limit exceeded');

      const groupsFromDb = await getLinkGroupsFromDatabase(
        limit,
        page,
        skip,
        privacylevel,
        specificUsername
      );
      if (!groupsFromDb) return res.status(404).end();

      const discordWebhookBody = {
        title: `GET link groups array from db`,
        description: `limit: ${limit}, page: ${page}, skip: ${skip}, privacylevel: ${privacylevel}, specificUsername: ${specificUsername}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json({
        currentPage: page,
        groups: groupsFromDb,
      });
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public incrementLinkedCount: defaultRouteHandler = async (req, res) => {
    try {
      const body = await req.json();
      const { id } = body;

      const linkGroupFromDb = await incrementLinkGroupLinkedCount(id);
      if (!linkGroupFromDb) return res.status(404).end();

      const discordWebhookBody = {
        title: `incremented linkedCount in link group ${linkGroupFromDb.name}`,
        description: `new linked count: ${linkGroupFromDb.linkedCount}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json(linkGroupFromDb);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
}

export default LinkGroupController;
