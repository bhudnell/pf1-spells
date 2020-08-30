# Creating the Database

This project uses a MySQL database to hold the spell information for queries.

The database must contain a table named `spells`
- required columns with the following types and names:
  - `varchar`: `spell_name`, `spell_level`, `saving_throw`, `spell_resistance`, `short_description`
  - `text`: `description_formatted`
  - `int`: `sor`, `wiz`, `cleric`, `druid`, `ranger`, `bard`, `paladin`, `alchemist`, `summoner`, `witch`, `inquisitor`, `oracle`, `antipaladin`, `magus`, `bloodrager`, `shaman`, `psychic`, `spell_medium`, `mesmerist`, `occultist`, `spiritualist`, `skald`, `investigator`, `hunter`, `summoner_unchained`
- optional columns with the following types and names:
  - `varchar`: `school`, `subschool`, `descriptor`, `casting_time`, `components`, `spell_range`, `area`, `effect`, `targets`, `duration`, `spell_source`, `deity`, `domain`, `linktext`, `bloodline`, `patron`, `mythic_text`, `augmented`, `haunt_statistics`
  - `bit`: `costly_components`, `dismissible`, `shapeable`, `verbal`, `somatic`, `material`, `focus`, `divine_focus`, `acid`, `air`, `chaotic`, `cold`, `curse`, `darkness`, `death`, `disease`, `earth`, `electricity`, `emotion`, `evil`, `fear`, `fire`, `spell_force`, `good`, `language_dependent`, `lawful`, `light`, `mind_affecting`, `pain`, `poison`, `shadow`, `sonic`, `water`, `mythic`, `ruse`, `draconic`, `meditative`
  - `text`: `spell_description`, `full_text`
  - `int`: `adept`, `SLA_Level`, `id`, `material_costs`

<details>
  <summary>a table with all the optional columns can be created with:</summary>
    
```
CREATE TABLE `spells` (
  `spell_name` varchar(36) NOT NULL,
  `school` varchar(13) NOT NULL,
  `subschool` varchar(23) DEFAULT NULL,
  `descriptor` varchar(49) DEFAULT NULL,
  `spell_level` varchar(213) NOT NULL,
  `casting_time` varchar(47) NOT NULL,
  `components` varchar(191) NOT NULL,
  `costly_components` bit(1) NOT NULL,
  `spell_range` varchar(74) DEFAULT NULL,
  `area` varchar(94) DEFAULT NULL,
  `effect` varchar(156) DEFAULT NULL,
  `targets` varchar(185) DEFAULT NULL,
  `duration` varchar(81) DEFAULT NULL,
  `dismissible` bit(1) NOT NULL,
  `shapeable` bit(1) NOT NULL,
  `saving_throw` varchar(73) DEFAULT NULL,
  `spell_resistance` varchar(40) DEFAULT NULL,
  `spell_description` text NOT NULL,
  `description_formatted` text NOT NULL,
  `spell_source` varchar(44) NOT NULL,
  `full_text` text NOT NULL,
  `verbal` bit(1) NOT NULL,
  `somatic` bit(1) NOT NULL,
  `material` bit(1) NOT NULL,
  `focus` bit(1) NOT NULL,
  `divine_focus` bit(1) NOT NULL,
  `sor` int(11) DEFAULT NULL,
  `wiz` int(11) DEFAULT NULL,
  `cleric` int(11) DEFAULT NULL,
  `druid` int(11) DEFAULT NULL,
  `ranger` int(11) DEFAULT NULL,
  `bard` int(11) DEFAULT NULL,
  `paladin` int(11) DEFAULT NULL,
  `alchemist` int(11) DEFAULT NULL,
  `summoner` int(11) DEFAULT NULL,
  `witch` int(11) DEFAULT NULL,
  `inquisitor` int(11) DEFAULT NULL,
  `oracle` int(11) DEFAULT NULL,
  `antipaladin` int(11) DEFAULT NULL,
  `magus` int(11) DEFAULT NULL,
  `adept` int(11) DEFAULT NULL,
  `deity` varchar(14) DEFAULT NULL,
  `SLA_Level` int(11) DEFAULT NULL,
  `domain` varchar(83) DEFAULT NULL,
  `short_description` varchar(155) DEFAULT NULL,
  `acid` bit(1) NOT NULL,
  `air` bit(1) NOT NULL,
  `chaotic` bit(1) NOT NULL,
  `cold` bit(1) NOT NULL,
  `curse` bit(1) NOT NULL,
  `darkness` bit(1) NOT NULL,
  `death` bit(1) NOT NULL,
  `disease` bit(1) NOT NULL,
  `earth` bit(1) NOT NULL,
  `electricity` bit(1) NOT NULL,
  `emotion` bit(1) NOT NULL,
  `evil` bit(1) NOT NULL,
  `fear` bit(1) NOT NULL,
  `fire` bit(1) NOT NULL,
  `spell_force` bit(1) NOT NULL,
  `good` bit(1) NOT NULL,
  `language_dependent` bit(1) NOT NULL,
  `lawful` bit(1) NOT NULL,
  `light` bit(1) NOT NULL,
  `mind_affecting` bit(1) NOT NULL,
  `pain` bit(1) NOT NULL,
  `poison` bit(1) NOT NULL,
  `shadow` bit(1) NOT NULL,
  `sonic` bit(1) NOT NULL,
  `water` bit(1) NOT NULL,
  `linktext` varchar(32) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `material_costs` int(11) DEFAULT NULL,
  `bloodline` varchar(106) DEFAULT NULL,
  `patron` varchar(58) DEFAULT NULL,
  `mythic_text` varchar(896) DEFAULT NULL,
  `augmented` varchar(496) DEFAULT NULL,
  `mythic` bit(1) NOT NULL,
  `bloodrager` int(11) DEFAULT NULL,
  `shaman` int(11) DEFAULT NULL,
  `psychic` int(11) DEFAULT NULL,
  `spell_medium` int(11) DEFAULT NULL,
  `mesmerist` int(11) DEFAULT NULL,
  `occultist` int(11) DEFAULT NULL,
  `spiritualist` int(11) DEFAULT NULL,
  `skald` int(11) DEFAULT NULL,
  `investigator` int(11) DEFAULT NULL,
  `hunter` int(11) DEFAULT NULL,
  `haunt_statistics` varchar(207) DEFAULT NULL,
  `ruse` bit(1) NOT NULL,
  `draconic` bit(1) NOT NULL,
  `meditative` bit(1) NOT NULL,
  `summoner_unchained` int(11) DEFAULT NULL,
  PRIMARY KEY (`spell_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
</details>

The data for the databse was taken from [Pathfinder Community spells database](http://home.pathfindercommunity.net/home/databases/spells) and missing values were added by hand
