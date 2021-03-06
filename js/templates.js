let templates = {};

templates.classTable = `
\`\`\`fancy
## <table-title> The Wizard

<spell-slots> Spell Slots per Spell Level
| Level | Proficiency<br>Bonus | Features                       | Cantrips<br>Known | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |
|:-----:|:--------------------:|:-------------------------------|:-----------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  1st  | +2                   | Spellcasting, Arcane Recovery  | 3                 |  2  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  2nd  | +2                   | Arcane Tradition               | 3                 |  3  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  3rd  | +2                   |  —                             | 3                 |  4  |  2  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  4th  | +2                   | Ability Score Improvement      | 4                 |  4  |  3  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  5th  | +3                   |  —                             | 4                 |  4  |  3  |  2  |  —  |  —  |  —  |  —  |  —  |  —  |
|  6th  | +3                   | Arcane Tradition Feature       | 4                 |  4  |  3  |  3  |  —  |  —  |  —  |  —  |  —  |  —  |
|  7th  | +3                   |  —                             | 4                 |  4  |  3  |  3  |  1  |  —  |  —  |  —  |  —  |  —  |
|  8th  | +3                   | Ability Score Improvement      | 4                 |  4  |  3  |  3  |  2  |  —  |  —  |  —  |  —  |  —  |
|  9th  | +4                   |  —                             | 4                 |  4  |  3  |  3  |  3  |  1  |  —  |  —  |  —  |  —  |
| 10th  | +4                   | Arcane Tradition Feature       | 5                 |  4  |  3  |  3  |  3  |  2  |  —  |  —  |  —  |  —  |
| 11th  | +4                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  —  |  —  |  —  |
| 12th  | +4                   | Ability Score Improvement      | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  —  |  —  |  —  |
| 13th  | +5                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  —  |  —  |
| 14th  | +5                   | Arcane Tradition Feature       | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  —  |  —  |
| 15th  | +5                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |  —  |
| 16th  | +5                   | Ability Score Improvement      | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |  —  |
| 17th  | +6                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |  1  |
| 18th  | +6                   | Spell Mastery                  | 5                 |  4  |  3  |  3  |  3  |  3  |  1  |  1  |  1  |  1  |
| 19th  | +6                   | Ability Score Improvement      | 5                 |  4  |  3  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |
| 20th  | +6                   | Signature Spell                | 5                 |  4  |  3  |  3  |  3  |  3  |  2  |  2  |  1  |  1  |
\`\`\`
`;

templates.spell = `
#### Spell Name

~ *1st-level evocation (ritual)*

<br>

~ **Casting Time:** 1 action
~ **Range:** 120 feet
~ **Components:** V, S, M (a drop of molasses)
~ **Duration:** Concentration, up to 1 minute

<br>

<noindent> The main text of the spell should go here.
`;

templates.noDualFooters = `
<style>
/*Disable dual footers*/
.book .page:nth-child(even) footer:before { padding:3mm 4mm 0 200mm; }
.book .page:nth-child(even) footer:after { transform:unset; }
.book .page:nth-child(even) footer { text-align:right; }
</style>
`;

templates.statBlock = `
\`\`\`stats
# Aarakocra
*Medium humanoid (aarakocra, neutral good)*

***

~ **Armor Class** 12
~ **Hit Points** 13 (3d8)
~ **Speed** 20 ft., fly 50 ft.

***

|   STR   |   DEX   |   CON   |   INT   |   WIS   |   CHA   |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| 10 (+0) | 14 (+2) | 10 (+0) | 11 (+0) | 12 (+1) | 11 (+0) |

***

~ **Skills** Perception +5
~ **Senses** passive Perception 15
~ **Languages** Auran
~ **Challenge** 1/4 (50 XP)

***
~~ ***Dive Attack.*** If the aarakocra is flying and dives at least 30 feet straight toward a target and then hits it with a melee weapon attack, the attack deals an extra 3 (1d6) damage to the target.

### Actions

~~ ***Talon.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage.

~~ ***Javelin.*** *Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage.

\`\`\`

`;

templates.statBlockLarge = `
\`\`\`stats wide two-column
# Aboleth
*Large aberration, lawful evil*

***

~ **Armor Class** 17 (natural armor)
~ **Hit Points** 135 (18d10 + 36)
~ **Speed** 10 ft., swim 40 ft.

***

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 21 (+5) | 9 (-1) | 15 (+2) | 18 (+4) | 15 (+2) | 18 (+4) |

***

~ **Saving Throws** Con +6, Int +8, Wis +6
~ **Skills** History +12, Perception +10
~ **Senses** darkvision 120 ft., passive Perception 20
~ **Languages** Deep Speech, telepathy 120 ft.
~ **Challenge** 10 (5,900 XP)

***

~~ ***Amphibious.*** The aboleth can breathe air and water.

~~ ***Mucous Cloud.*** While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 feet of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.

~~ ***Probing Telepathy.*** If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires, if the aboleth can see the creature.

### Actions

~~ ***Multiattack.*** The aboleth makes three tentacle attacks.

~~ ***Tentacle.*** *Melee weapon attack:* +9 to hit, reach 10 ft., one target. *Hit:* 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw

<columnbreak>

or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures desease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by *heal* or another disease-curing spell of 6th level or higher. When the creature is outlside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.

~~ ***Tail.*** *Melee Weapon Attack:* +9 to hit, reach 10 ft, one target. *Hit*: 16 (3d6 + 5) bludgeoning damage.

~~ ***Enslave (3/Day).*** The aboleth targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can comunicate telepathically with each other over any distance.<br>Whenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.

### Legendary Actions

The aboleth can take 3 legendary actions, choosing from the options below. Only one legendary ation option can be used at a time and only at the end of another creatutre's turn. THe aboleth regains spent legendary actions at the start of its turn.<br><br>

~ **Detect**. The aboleth makes a Wisdom (Perception) check.
~ **Tail Swipe.** The aboleth makes one tail attack.
~ **Psychic Drain (Costs 2 Actions).** One creature charmed by the Aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.
\`\`\`
`;


// Default files
var defaultFiles = [
    {
        name:"Welcome",
        content:''
    },
    {
        name:"PHB",
        content:
`# PHB Samples

I've typed up a couple of random pages from the PHB and included a scan that I found online of the same page.

Take a look and see what you think.

<pagebreak>

<noindent> three eight-sided dice, add them together, and add 5 to the total.

The same d notation appears in the expressions "1d3" and "1d2." To simulate the roll of 1d3, roll a d6 and divide the number rolled by 2 (round up). To simulate the roll of 1d2, roll any die and assign a 1 or 2 to the roll depending on whether it was odd or even. (Alternatively, if the number rolled is more than half the number of sides on the die, it’s a 2.)

### The D20
Does an adventurer’s sword swing hurt a dragon or just bounce off its iron-hard scales? Will the ogre believe an outrageous bluff? Can a character swim across a raging river? Can a character avoid the main blast of a fireball, or does he or she take full damage from the blaze? In cases where the outcome of an action is uncertain, the \`Dungeons & Dragons\` game relies on rolls of a 20-sided die, a d20, to determine success or failure.

Every character and monster in the game has capabilities defined by six **ability scores**. The abilities are Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma, and they typically range from 3 to 18 for most adventurers. (Monsters might have scores as low as 1 or as high as 30.) These ability scores, and the **ability modifiers** derived from them, are the basis for almost every d20 roll that a player makes on a character’s or monster’s behalf.

Ability checks, attack rolls, and saving throws are the three main kinds of d20 rolls, forming the core of the rules of the game. All three follow these simple steps.

 **1. Roll the die and add a modifier.** Roll a d20 and add the relevant modifier. This is typically the modifier derived from one of the six ability scores, and it sometimes includes a proficiency bonus to reflect a character’s particular skill. (See chapter 1 for details on each ability and how to determine an ability’s modifier.)

 **2. Apply circumstantial bonuses and penalties.** A class feature, a spell, a particular circumstance, or some other effect might give a bonus or penalty to the check.

<columnbreak>

 **3. Compare the total to a target number.** If the total equals or exceeds the target number, the ability check, attack roll, or saving throw is a success. Otherwise, it’s a failure. The DM is usually the one who determines target numbers and tells players whether their ability checks, attack rolls, and saving throws succeed or fail.

The target number for an ability check or a saving throw is called a **Difficulty Class** (DC). The target number for an attack roll is called an **Armor Class** (AC).

This simple rule governs the resolution of most tasks in D&D play. Chapter 7 provides more detailed rules for using the d20 in the game.

### Advantage & Disadvantage
Sometimes an ability check, attack roll, or saving throw is modified by special situations called advantage and disadvantage. Advantage reflects the positive circumstances surrounding a d20 roll, while disadvantage reflects the opposite. When you have either advantage or disadvantage, you roll a second d20 when you make the roll. Use the higher of the two rolls if you have advantage, and use the lower roll if you have disadvantage. For example, if you have disadvantage and roll a 17 and a 5, you use the 5. If you instead have advantage and roll those numbers, you use the 17.

More detailed rules for advantage and disadvantage are presented in chapter 7.

### Specific Beats General
This book contains rules, especially in parts 2 and 3, that govern how the game plays. That said, many racial traits, class features, spells, magic items, monster abilities, and other game elements break the general rules in some way, creating an exception to how the rest of the game works. Remember this: If a specific rule contradicts a general rule, the specific rule wins.

Exceptions to the rules are often minor. For instance, many adventurers don’t have proficiency with longbows, but every wood elf does because of a racial trait. That trait creates a minor exception in the game. Other examples of rule-breaking are more conspicuous. For instance, an adventurer can’t normally pass through walls, but some spells make that possible. Magic accounts for most of the major exceptions to the rules.

### Round Down
There’s one more general rule you need to know at the outset. Whenever you divide a number in the game, round down if you end up with a fraction, even if the fraction is one-half or greater.

## Adventures
The \`Dungeons & Dragons\` game consists of a group of characters embarking on an adventure that the Dungeon Master presents to them. Each character brings particular capabilities to the adventure in the form of ability scores and skills, class features, racial traits, equipment, and magic items. Every character is different, with various strengths and weaknesses, so the best party of adventurers is one in which the characters complement each other and cover the weaknesses of

<img src="img.png" style="position:absolute; bottom:1.5cm; left:0.8cm;width:41%">

<pagebreak>

<img src="phbp7.png" style="position:absolute; width:103%; top:50%;left:0;transform:translate(-1%,-50%);">

<pagebreak>



\`\`\`fancy
## <table-title> The Wizard

<spell-slots> Spell Slots per Spell Level
| Level | Proficiency<br>Bonus | Features                       | Cantrips<br>Known | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |
|:-----:|:--------------------:|:-------------------------------|:-----------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  1st  | +2                   | Spellcasting, Arcane Recovery  | 3                 |  2  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  2nd  | +2                   | Arcane Tradition               | 3                 |  3  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  3rd  | +2                   |  —                             | 3                 |  4  |  2  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  4th  | +2                   | Ability Score Improvement      | 4                 |  4  |  3  |  —  |  —  |  —  |  —  |  —  |  —  |  —  |
|  5th  | +3                   |  —                             | 4                 |  4  |  3  |  2  |  —  |  —  |  —  |  —  |  —  |  —  |
|  6th  | +3                   | Arcane Tradition Feature       | 4                 |  4  |  3  |  3  |  —  |  —  |  —  |  —  |  —  |  —  |
|  7th  | +3                   |  —                             | 4                 |  4  |  3  |  3  |  1  |  —  |  —  |  —  |  —  |  —  |
|  8th  | +3                   | Ability Score Improvement      | 4                 |  4  |  3  |  3  |  2  |  —  |  —  |  —  |  —  |  —  |
|  9th  | +4                   |  —                             | 4                 |  4  |  3  |  3  |  3  |  1  |  —  |  —  |  —  |  —  |
| 10th  | +4                   | Arcane Tradition Feature       | 5                 |  4  |  3  |  3  |  3  |  2  |  —  |  —  |  —  |  —  |
| 11th  | +4                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  —  |  —  |  —  |
| 12th  | +4                   | Ability Score Improvement      | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  —  |  —  |  —  |
| 13th  | +5                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  —  |  —  |
| 14th  | +5                   | Arcane Tradition Feature       | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  —  |  —  |
| 15th  | +5                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |  —  |
| 16th  | +5                   | Ability Score Improvement      | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |  —  |
| 17th  | +6                   |  —                             | 5                 |  4  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |  1  |
| 18th  | +6                   | Spell Mastery                  | 5                 |  4  |  3  |  3  |  3  |  3  |  1  |  1  |  1  |  1  |
| 19th  | +6                   | Ability Score Improvement      | 5                 |  4  |  3  |  3  |  3  |  3  |  2  |  1  |  1  |  1  |
| 20th  | +6                   | Signature Spell                | 5                 |  4  |  3  |  3  |  3  |  3  |  2  |  2  |  1  |  1  |

\`\`\`

### The Lure of Knowledge

Wizards’ lives are seldom mundane. The closest a
wizard is likely to come to an ordinary life is working
as a sage or lecturer in a library or university, teaching
others the secrets of the multiverse. Other wizards sell
their services as diviners, serve in military forces, or
pursue lives of crime or domination.

But the lure of knowledge and power calls even the
most unadventurous wizards out of the safety of their
libraries and laboratories and into crumbling ruins and
lost cities. Most wizards believe that their counterparts
in ancient civilizations knew secrets of magic that have
been lost to the ages, and discovering those secrets
could unlock the path to a power greater than any magic
available in the present age.

### Creating a Wizard
Creating a wizard character demands a backstory
dominated by at least one extraordinary event. How
did your character first come into contact with magic?
How did you discover you had an aptitude for it? Do
you have a natural talent, or did you simply study
hard and practice incessantly? Did you encounter a
magical creature or an ancient tome that taught you the
basics of magic?

What drew you forth from your life of study? Did your
first taste of magical knowledge leave you hungry for
more? Have you received word of a secret repository
of knowledge not yet plundered by any other wizard?
Perhaps you’re simply eager to put your newfound
magical skills to the test in the face of danger.

<columnbreak>

#### Quick Build
You can make a wizard quickly by following these
suggestions. First, Intelligence should be your highest
ability score, followed by Constitution or Dexterity.

<noindent>If you plan to join the School of Enchantment, make
Charisma your next-best score. Second, choose the sage
background. Third, choose the *mage hand*, *light*, and
*ray of frost* cantrips, along with the following 1st-level
spells for your spellbook: *burning hands*, *charm person*,
*feather fall*, *mage armor*, *magic missile*, and *sleep*.

## Class Features

As a Wizard, you gain the following class features.

#### Hit Points

~ **Hit Dice:** 1d6 per wizard level
~ **Hit Points at 1st Level:** 6 + your Constitution modifier
~ **Hit Points at Higher Levels:** 1d6 (or 4) + your Constitution modifier per wizard level after 1st


#### Proficiencies
~ **Armor:** None
~ **Weapons:** Daggers, darts, slings, quarterstaffs,
light crossbows
~ **Tools:** None

<br>

~ **Saving Throws:** Intelligence, Wisdom
~ **Skills:** Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion

<pagebreak>

<img src="phbp113.png" style="position:absolute;width:100%;top:0;left:0;">
`
    }
];
