import { Link, LinkGroup, PrismaClient, User } from '@prisma/client';
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
  { id: uuidv4(), name: 'calculators' },
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
const initialUsers: User[] = [
  {
    id: uuidv4(),
    name: 'lynxapp',
    email: 'lynx@fox.app',
    password: 'X',
    authProvider: 5,
    createdAt: dN,
    lastLogin: dN,
  },
];

const initialLinkGroups = [
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Tabletop',
    description: "Various generators, tools and resources for tabletop rpg's",
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Path of Exile',
    description: 'Helpful PoE links and builds',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Super information',
    description: 'Encyclopedias and various information providers of any kind',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'React Native Yt Channels',
    description: 'React Native youtube with tons of insightful content',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Abstract strategy games',
    description: 'List of many abstract strategy games mostly in 2D',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Steam',
    description: 'Steam related statistics, tools and apps',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Awesome',
    description: 'Group with all of the awesome repositories',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Essential Firefox addons',
    description: 'Extensions every Firefox user needs',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Essential Chrine addons',
    description: 'Extensions every Chrome user needs',
    privacyLevel: 3,
  },
  {
    id: uuidv4(),
    owner: initialUsers[0].id,
    name: 'Blender',
    description: 'Blender tuts and resources',
    privacyLevel: 3,
  },
];
const link: Link = null;
const initialLinks = [
  {
    link: 'https://azgaar.github.io/Fantasy-Map-Generator/',
    description: 'The best fantasy map generator, check his git for more',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://donjon.bin.sh/',
    description: 'Plenty of various tools and generatos for d20 systems',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://watabou.itch.io/medieval-fantasy-city-generator',
    description: 'Amazing city generator, check out watabou for more',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.wonderdraft.net/',
    description: 'Paid fantasy map creation tool',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.improved-initiative.com/e/',
    description: 'Web combat tracker tool',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://deepnight.net/tools/rpg-map/',
    description: 'Fantasy combat map generator/creation tool',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.improved-initiative.com/e/',
    description: 'Web combat tracker tool',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://probabletrain.itch.io/city-generator',
    description:
      'Procedural modern city map generator with 3D map generation feature',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://excalidraw.com/',
    description: 'Whiteboard like drawing tool',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://www.owlbear.rodeo',
    description: 'Web tabletop encounter tool',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
  {
    link: 'https://mapstyle.withgoogle.com/',
    description: 'Styled google map as rpg resource',
    privacyLevel: 3,
    group: initialLinkGroups[0].id,
  },
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
    await db.user.createMany({ data: initialUsers });

    //Create initial linkgroups
    await db.linkGroup.createMany({ data: initialLinkGroups });
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
