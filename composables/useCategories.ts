import TbBeach from "~/components/ui/icons/categories/TbBeach.vue";
import GiWindmill from "~/components/ui/icons/categories/GiWindmill.vue";
import MdOutlineVilla from "~/components/ui/icons/categories/MdOutlineVilla.vue";
import TbMountain from "~/components/ui/icons/categories/TbMountain.vue";
import TbPool from "~/components/ui/icons/categories/TbPool.vue";
import GiIsland from "~/components/ui/icons/categories/GiIsland.vue";
import FaSkiing from "~/components/ui/icons/categories/FaSkiing.vue";
import GiBoatFishing from "~/components/ui/icons/categories/GiBoatFishing.vue";
import GiCastle from "~/components/ui/icons/categories/GiCastle.vue";
import GiCaveEntrance from "~/components/ui/icons/categories/GiCaveEntrance.vue";
import GiBarn from "~/components/ui/icons/categories/GiBarn.vue";
import IoDiamond from "~/components/ui/icons/categories/IoDiamond.vue";
import GiForestCamp from "~/components/ui/icons/categories/GiForestCamp.vue";
import BsSnow from "~/components/ui/icons/categories/BsSnow.vue";
import GiCactus from "~/components/ui/icons/categories/GiCactus.vue";


export const useCategories = () => {
    return [
        {
            label: "Beach",
            icon: TbBeach,
            description: "This property is close to the beach!",
        },
        {
            label: "Windmills",
            icon: GiWindmill,
            description: "This property is has windmills!",
        },
        {
            label: "Modern",
            icon: MdOutlineVilla,
            description: "This property is modern!",
        },
        {
            label: "Countryside",
            icon: TbMountain,
            description: "This property is in the countryside!",
        },
        {
            label: "Pools",
            icon: TbPool,
            description: "This is property has a beautiful pool!",
        },
        {
            label: "Islands",
            icon: GiIsland,
            description: "This property is on an island!",
        },
        {
            label: "Lake",
            icon: GiBoatFishing,
            description: "This property is near a lake!",
        },
        {
            label: "Skiing",
            icon: FaSkiing,
            description: "This property has skiing activies!",
        },
        {
            label: "Castles",
            icon: GiCastle,
            description: "This property is an ancient castle!",
        },
        {
            label: "Caves",
            icon: GiCaveEntrance,
            description: "This property is in a spooky cave!",
        },
        {
            label: "Camping",
            icon: GiForestCamp,
            description: "This property offers camping activities!",
        },
        {
            label: "Arctic",
            icon: BsSnow,
            description: "This property is in arctic environment!",
        },
        {
            label: "Desert",
            icon: GiCactus,
            description: "This property is in the desert!",
        },
        {
            label: "Barns",
            icon: GiBarn,
            description: "This property is in a barn!",
        },
        {
            label: "Lux",
            icon: IoDiamond,
            description: "This property is brand new and luxurious!",
        },
    ];
}