import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const db = new PrismaClient();

const initialTags = [
  { id: uuidv4(), name: 'tech' },
  { id: uuidv4(), name: 'ent' },
  { id: uuidv4(), name: 'book' },
  { id: uuidv4(), name: 'full-movie' },
  { id: uuidv4(), name: 'tv-show' },
  { id: uuidv4(), name: 'video' },
  { id: uuidv4(), name: 'yt' },
  { id: uuidv4(), name: 'js' },
  { id: uuidv4(), name: 'amazing-js' },
  { id: uuidv4(), name: 'ts' },
  { id: uuidv4(), name: 'rpg' },
  { id: uuidv4(), name: 'tabletop' },
  { id: uuidv4(), name: 'tool' },
  { id: uuidv4(), name: 'generator' },
  { id: uuidv4(), name: 'playlist' },
  { id: uuidv4(), name: 'tutorial' },
  { id: uuidv4(), name: 'howto' },
  { id: uuidv4(), name: 'animation' },
  { id: uuidv4(), name: 'calculator' },
  { id: uuidv4(), name: 'wow' },
  { id: uuidv4(), name: 'knowledge sharing' },
  { id: uuidv4(), name: 'knwoledge' },
  { id: uuidv4(), name: 'encyclopedia' },
  { id: uuidv4(), name: 'api' },
  { id: uuidv4(), name: 'toy' },
  { id: uuidv4(), name: 'cli' },
  { id: uuidv4(), name: 'Node.js' },
  { id: uuidv4(), name: 'React' },
  { id: uuidv4(), name: 'framework' },
  { id: uuidv4(), name: 'Rust' },
  { id: uuidv4(), name: 'TypeScript' },
  { id: uuidv4(), name: 'Figma' },
  { id: uuidv4(), name: 'css' },
  { id: uuidv4(), name: 'design' },
  { id: uuidv4(), name: 'scss' },
  { id: uuidv4(), name: 'extension' },
  { id: uuidv4(), name: 'awesome' },
  { id: uuidv4(), name: 'performance' },
  { id: uuidv4(), name: 'information' },
  { id: uuidv4(), name: 'cheat sheet' },
  { id: uuidv4(), name: 'sheet' },
  { id: uuidv4(), name: 'git' },
  { id: uuidv4(), name: 'github' },
  { id: uuidv4(), name: 'open source' },
  { id: uuidv4(), name: 'free' },
  { id: uuidv4(), name: 'selfhosted' },
  { id: uuidv4(), name: 'devops' },
  { id: uuidv4(), name: 'Vue' },
  { id: uuidv4(), name: 'backend' },
  { id: uuidv4(), name: 'frontend' },
  { id: uuidv4(), name: 'fullstack' },
  { id: uuidv4(), name: 'game' },
  { id: uuidv4(), name: 'multiplayer' },
  { id: uuidv4(), name: 'online' },
  { id: uuidv4(), name: 'offline' },
  { id: uuidv4(), name: 'database' },
  { id: uuidv4(), name: 'UX' },
  { id: uuidv4(), name: 'UI' },
  { id: uuidv4(), name: 'interface' },
  { id: uuidv4(), name: 'audio' },
  { id: uuidv4(), name: 'hardware' },
];
const dN = new Date();
const initialUsers = [
  {
    id: uuidv4(),
    name: 'lynxapp',
    email: 'lynx@fox.app',
    password: 'X',
    authProvider: 5,
    createdAt: dN,
    lastLogin: dN,
    username: 'lynxapp',
  },
];

const initialLinkGroups = [
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Tabletop',
    groupname: 'tabletop',
    description: "Various generators, tools and resources for tabletop rpg's",
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Path of Exile',
    groupname: 'path-of-exile',
    description: 'Helpful PoE links',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Super information',
    groupname: 'super-information',
    description: 'Encyclopedias and various information providers of any kind',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'React Native Yt Channels',
    groupname: 'react-native-yt-channels',
    description: 'React Native youtube with tons of insightful content',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Abstract strategy games',
    groupname: 'abstract-strategy-games',
    description: 'List of many abstract strategy games mostly in 2D',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Steam',
    groupname: 'steam',
    description: 'Steam related statistics, tools and apps',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Awesome',
    groupname: 'awesome',
    description: 'Group with all of the awesome repositories',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Essential Firefox addons',
    groupname: 'essential-firefox-addons',
    description: 'Extensions every Firefox user needs',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Essential Chrome addons',
    groupname: 'essential-chrome-addons',
    description: 'Extensions every Chrome user needs',
    privacyLevel: 0,
  },
  {
    id: uuidv4(),
    owner: 'lynxapp',
    name: 'Blender',
    groupname: 'blender',
    description: 'Blender tuts and resources',
    privacyLevel: 0,
  },
];

const initialGroupTags = [
  {
    group: initialLinkGroups[0].id,
    tag: initialTags[13].id,
  },
  {
    group: initialLinkGroups[0].id,
    tag: initialTags[10].id,
  },
  {
    group: initialLinkGroups[0].id,
    tag: initialTags[11].id,
  },
  {
    group: initialLinkGroups[0].id,
    tag: initialTags[12].id,
  },
  //- Poe
  {
    group: initialLinkGroups[1].id,
    tag: initialTags[51].id,
  },
  {
    group: initialLinkGroups[1].id,
    tag: initialTags[13].id,
  },
  {
    group: initialLinkGroups[1].id,
    tag: initialTags[55].id,
  },
  {
    group: initialLinkGroups[1].id,
    tag: initialTags[12].id,
  },
  //- Info
  {
    group: initialLinkGroups[2].id,
    tag: initialTags[55].id,
  },
  {
    group: initialLinkGroups[2].id,
    tag: initialTags[21].id,
  },
  {
    group: initialLinkGroups[2].id,
    tag: initialTags[22].id,
  },
  {
    group: initialLinkGroups[2].id,
    tag: initialTags[38].id,
  },
];

const initialLinks = [
  {
    link: 'https://azgaar.github.io/Fantasy-Map-Generator/',
    description: 'The best fantasy map generator, check his git for more',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://donjon.bin.sh/',
    description: 'Plenty of various tools and generatos for d20 systems',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://watabou.itch.io/medieval-fantasy-city-generator',
    description: 'Amazing city generator, check out watabou for more',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.wonderdraft.net/',
    description: 'Paid fantasy map creation tool',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.improved-initiative.com/e/',
    description: 'Web combat tracker tool',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://deepnight.net/tools/rpg-map/',
    description: 'Fantasy combat map generator/creation tool',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.improved-initiative.com/e/',
    description: 'Web combat tracker tool',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://probabletrain.itch.io/city-generator',
    description:
      'Procedural modern city map generator with 3D map generation feature',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://excalidraw.com/',
    description: 'Whiteboard like drawing tool',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.owlbear.rodeo',
    description: 'Web tabletop encounter tool',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://mapstyle.withgoogle.com/',
    description: 'Styled google map as rpg resource',
    privacyLevel: 0,
    group: initialLinkGroups[0].id,
  },
  //-- Poe
  {
    link: 'https://github.com/PathOfBuildingCommunity/PathOfBuilding',
    description: 'Most comprehensive character building/prototyping tool',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://github.com/SnosMe/awakened-poe-trade',
    description: 'All in one overlay tool for trading simplification',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://www.poeprices.info/',
    description: 'Web app for item price checking',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://www.craftofexile.com/',
    description:
      "Webapp which provides tools and information about PoE's crafting systems",
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://poe.ninja/',
    description:
      'All around biggest platform for fast checking currently trending builds, prices and statistics',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://github.com/viktorgullmark/exilence-next',
    description: 'Desktop app for wealth and farming efficiency summarization',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://www.pathofexile.com/fullscreen-atlas-skill-tree',
    description: 'GGG interactive web atlas skill tree',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://poe-racing.com/',
    description: 'PoE leaderboard for racing/challenges',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://chrome.google.com/webstore/detail/better-pathofexile-tradin/fhlinfpmdlijegjlpgedcmglkakaghnk',
    description: 'Chrome | Firefox addon for improved trading',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },
  {
    link: 'https://www.filterblade.xyz/',
    description: 'Website with loot filter for any league',
    privacyLevel: 0,
    group: initialLinkGroups[1].id,
  },

  //- Info
  {
    link: 'https://www.britannica.com/',
    description: 'Online encyclopedia',
    privacyLevel: 0,
    group: initialLinkGroups[2].id,
  },
  {
    link: 'https://sci.hubg.org/',
    description: 'Science resources database not gated behind paywalls',
    privacyLevel: 0,
    group: initialLinkGroups[2].id,
  },
  {
    link: 'https://sip.srem.pl/',
    description: 'Polish surface information system',
    privacyLevel: 0,
    group: initialLinkGroups[2].id,
  },
  {
    link: 'https://www.zotero.org/',
    description: 'Research assistant for Academic resource linking',
    privacyLevel: 0,
    group: initialLinkGroups[2].id,
  },
  {
    link: 'https://libgen.rs/',
    description: 'Biggest repository of published books and resources',
    privacyLevel: 0,
    group: initialLinkGroups[2].id,
  },
  {
    link: 'https://liveuamap.com/',
    description: 'Map for conflict monitoring',
    privacyLevel: 0,
    group: initialLinkGroups[2].id,
  },
  //-
];

const load = async () => {
  try {
    //TODO Implement initial db data seeding

    //Create initial tags

    await db.tag.deleteMany();
    await db.tag.createMany({
      data: initialTags,
    });

    //Create initial lynxapp user
    await db.user.deleteMany();
    await db.user.createMany({ data: initialUsers });

    //Create initial linkgroups
    await db.linkGroup.deleteMany();
    await db.linkGroup.createMany({ data: initialLinkGroups });

    //Create initial links
    await db.link.createMany({ data: initialLinks });

    //Create initial group tags
    await db.groupTag.createMany({ data: initialGroupTags });
  } catch (e) {
    console.error('There was an error while seeding');
    console.error(e);
    process.exit(1);
  } finally {
    console.log('Successfully seeded database. Closing connection.');
    await db.$disconnect();
  }
};
load();
