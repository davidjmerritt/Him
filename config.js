var BLUE = [32, 56, 236];
var DARK_BLUE = [25, 35, 120];
var WHITE = [252, 252, 252];
var OFF_WHITE = [245, 245, 235];
var BROWN = [200, 76, 12];
var OFF_BROWN = [180, 70, 10];
var GREEN = [0, 168, 0];
var DARK_GREEN = [40, 80, 40];
var OFF_GREEN = [100, 150, 0];
var GRAY = [116, 116, 116];
var LIGHT_GRAY = [216, 216, 216];
var TAN = [252, 216, 168];
var LIGHT_TAN = [255, 225, 200];
var BLACK = [0, 0, 0];
var RED = [200,0,0];
var DARK_RED = [190,0,50];
var DARKER_RED = [150,0,40];
var ORANGE = [255,100,0];
var OFF_ORANGE = [255,80,0];
var OFF_YELLOW = [225, 225, 225];
var YELLOW = [255,180,50];
var LIGHT_YELLOW = [255,210,150];
var DARK_GRAY = [100, 100, 100];
var DARKER_GRAY = [75, 75, 75];
var WOOD_BROWN = [150, 120, 70];
var DARK_BROWN = [100, 70, 50];
var LIGHT_BLUE = [50, 200, 255];
var LIGHTER_BLUE = [100, 250, 255];
var GOLD = [255,230,100];
var PINK = [255,0,100];
var LIGHT_PINK = [255,150,150];
var OFF_PINK = [255,0,80];
var LIGHT_GREEN = [100,255,100];
var PURPLE = [140, 0, 142];
var OFF_PURPLE = [130, 0, 132];
var COOL_BLUE = [150, 200, 255];
var COLORS = [DARKER_GRAY,PURPLE,OFF_WHITE,LIGHT_GREEN,PINK,BLUE,WHITE,BROWN,GREEN,GRAY,TAN,BLACK,RED,ORANGE,YELLOW,WOOD_BROWN,DARK_GRAY,LIGHT_BLUE,LIGHT_TAN,DARK_RED,DARK_BLUE,GOLD,DARK_GREEN,DARKER_RED];


var pixelSize = 12.5;
var blockSize = 50;
var appWidth = 960;
var appBlockWidth = appWidth/blockSize;
var appHeight = 720;
var appBlockHeight = appHeight/blockSize;

var deathCount = 0;
var level = 0;
var worldWidth = 16; //4
var worldHeight = 8; //8 //2
var defaultCoords = [0,0]; // [world.matrixWidth/2,world.matrixHeight-1];;
var loadedZone;

var startingSword = 4; // 4=WOOD, 7=WHITE, 8=MASTER
var startItems = [5,6,14]; // 5=HEART, 6=5-COIN, 14=FAIRY

var gameWon = false;
var matrixTest = [];

var startHealth = 6;
var totalHealth = 12;

var maxCoins = 999;

var progressBarWidth = blockSize*2+10;

var defaultFont = "Helvetica";

var numberOfShopsMax = 4;

var clusterTypesIndex = ["RIVER_2","RIVER_1","TREES","SPECTACLE_ROCK","EMPTY","SNOW_TOP","DIRT_TOP","TRI_ROOM","LONE_BROWN_STONE","LONE_GRAY_STONE","LONG_SHRUB","WARP_STONES","TWO_POOLS","GREEN_GRID","TWO_GREEN","LARGE_WARP_STONES","GRAY_STRIPS"];

var gameWonCount = 0;

var controlsEnabled = true;

var defaultZoneBlocks = {
  topBorder: [],
  bottomBorder: [],
  leftBorder: [],
  rightBorder: [],
  "temporary": [],
  "items": []
};

var STATE = 'OVERWORLD'

SNES_UP     = 67; // c
SNES_DOWN   = 68; // d
SNES_LEFT   = 69; // e
SNES_RIGHT  = 70; // f
SNES_A      = 71; // g
SNES_X      = 72; // h
SNES_Y      = 73; // i
SNES_B      = 74; // j
SNES_L      = 75; // k
SNES_R      = 77; // m
SNES_SELECT = 78; // n
SNES_START  = 79; // o

var jokes = ["Don't stay in bed, unless you can make money in bed.","What's the difference between a blonde and a mosquito? A mosquito stops sucking when you smack it.","How is a pussy like a grapefruit? The best ones squirt when you eat them.","What's the difference between acne and a Catholic Priest? Acne will usually not come on a kid's face until around 13 or 14 years of age.","How do you turn a fox into an elephant? Marry it!","Why does the bride always wear white? Because it is good for the dishwasher to match the stove and refrigerator.","What is the difference between a battery and a woman? A battery has a positive side.","How do you tell if a chick's too fat to f*ck? When you pull her pants down and her ass is still in them.","What is the difference between a drug dealer and a hooker? A hooker can wash her crack and sell it again!","Do you know why they call it the Wonder Bra? When you take it off you wonder where her tits went.","Why is it so hard for women to take a piss in the morning? Did you ever try to peel apart a grilled cheese sandwich?","Why don't pygmies wear tampons? They keep stepping on the strings.","What do you call 25 lesbians stacked on top of each other? A block of flaps!","How do we know God is a man? Because if God were a woman, sperm would taste like chocolate!","Why do women rub their eyes when they get up in the morning? They don't have balls to scratch.","What is the definition of making love? Something a woman does while a guy is humping her","What's the best thing about Alzheimer's disease? You get to meet new people every day!","What do rednecks do for Halloween? Pump kin!","Why is it difficult to find men who are sensitive, caring and good looking? They've got boyfriends already.","Why do women close their eyes during sex? They can't stand seeing a man have a good time.","Why do men like blowjobs? It's the only time they get something into a woman's head  straight!","What's the biggest problem for an atheist? No-one to talk to during an orgasm!","What's worse than a cardboard box? Paper tits!","Why do Jewish men like to watch porno movies backwards? They like the part where the hooker gives the money back.","What is 60 foot long and stinks of piss? A conga in an old people's home!","Why are electric trains like a mother's breasts? They were both designed for the kids, but it's the fathers who are always playing with them.","What do women and dog turds have in common? The older they are, the easier they are to pick up!","What is the similarity between a woman and laxative? They both irritate the shit out of you!","What's the best thing about a blow job? Five minutes of peace and quiet. ","What's the difference between Bill Clinton and JFK? One got his head blown off and the other was assassinated.","What's the difference between a lawyer and God? God doesn't think he's a lawyer ","What's the difference between toilet paper and toast? Toast is brown on both sides.","What's soft and warm when you go to bed, but hard and stiff when you wake up? Vomit.","What's the medical term for a female-to-male sex change operation? Strapadictomy.","Two condoms walk past a gay bar. One of them says to the other, “Hey, whaddya say we go in there and get shit-faced? “","Why is the space between a girl's tits and hips called the waist? Because you could put another pair of tits in there","What do you call three dogs and a blackbird? The Spice Girls","What's the similarity between getting a blow job from an eighty year-old and walking the tightrope? In both cases you really don't want to look down…","What's the difference between a dog and a fox? About eight pints of beer.","How do you embarrass an archaeologist? Give him a used tampon and ask him which period it's from.","Why do men snore when they lay on their backs? Because their balls fall over their asshole and they vapor-lock.","What's the difference between love, true love and showing off? Spitting, swallowing and gargling","What's the difference between a Catholic wife and a Jewish wife? A Catholic wife has real orgasms and fake jewelry.","What's the definition of a Yankee? Same thing as a “quickie,” only you do it yourself.","What makes men chase women they have no intention of marrying? The same urge that makes dogs chase cars they have no intention of driving.","Who is the most popular guy at the nudist colony? The guy who can carry a cup of coffee in each hand and a dozen donuts. Who is the most popular girl at the nudist colony? She is the one who can eat the last donut!","A brunette, a blonde, and a redhead are all in third grade: Who has the biggest tits? The blonde, because she's 18.","The three words most hated by men during sex? “Are you In? ” or “Is It In? “","Three words women hate to hear when having sex  “Honey, I'm home!”","Why do men take showers instead of baths? Pissing in the bath is disgusting.","Did you hear about the new paint called “Blonde” paint? It's not very bright, but it spreads easy.","What is sometimes hard, sometimes soft and combines with crumpet to give pleasure? Butter.","What's big, purple and swims in the sea? Moby Plum","What do you call the crusties inside of women's underwear? Clitty litter.","What should you do if you find your husband staggering in the backyard? Shoot him again.","Did you hear about the two blondes that were found frozen to death in their car at the drive in?  Yeah, they went to see “Closed For The Winter”","What should you do if you girlfriend starts smoking? Slow down and use a lubricant.","What do you call the useless piece of skin on the end of a man's penis? His body.","How can you tell when a man is well-hung? When you can just barely slip your finger in between his neck and the noose.","Why do little boys whine? Because they're practicing to be men.","How many men does it take to screw in a light bulb? One – he just holds it up there and waits for the world to revolve around him","How many men does it take to screw in a light bulb? Three – one to screw in the bulb, and two to listen to him brag about the screwing part.","What do you call a handcuffed man? Trustworthy.","What does it mean when a man is in your bed gasping for breath and calling your name? You didn't hold the pillow down long enough.","Why do doctors slap babies butts right after they're born? To knock the penises off the smart ones.","Why do men name their penises? Because they don't like the idea of having a stranger make 90% of their decisions.","Why does it take 100,000,000 sperm to fertilize one egg? Because not one will stop and ask directions.","Why do female black widow spiders kill their males after mating? To stop the snoring before it starts.","What's the best way to kill a man? Put a naked woman and a six-pack in front of him. Then tell him to pick only one.","What do men and pantyhose have in common? They either cling, run or don't fit right in the crotch!","Why do men whistle when they're sitting on the toilet? Because it helps them remember which end they need to wipe.","What is the difference between men and women? A woman wants one man to satisfy her every need. A man wants every woman to satisfy his one need.","How does a man keep his youth? By giving her money, furs and diamonds.","How do you keep your husband from reading your e-mail? Rename the mail folder to “instruction manuals”","What is the best thing to come out of Wales? The M4.","Did you hear about the man who was tap dancing? He broke his ankle when he fell into the sink.","“Doctor, doctor. Every time I sit down, I see visions of Mickey Mouse and Pluto, every time I stand up, I see Donald Duck.”  “How long have you been having these Disney spells?”","An Irishman goes up to bed every night taking a full glass of water and an empty glass with him .Why? Because some nights he is thirsty, and some nights he isn't.","What do you say to a woman with no arms and no legs? Nice tits!","What's the difference between a blonde and an ironing board? It's difficult to open the legs of an ironing board.","How does every ethnic joke start? By looking over your shoulder.","What do you call a man with two raincoats on in a cemetary? Max Bygraves","When is a pixie not a pixie? When he's got his head up a fairy's skirt, then he's a goblin'.","What's the difference between light and hard? You can get to sleep with a light on.","What do you call a man with a seagull on his head? Cliff","Confucious he say…  Panties not best thing on earth, but next to it.","Why did the man cross the road? He heard the chicken was a slut.","What do women and prawns have in common? Their heads are full of shit but the pink bits taste great.","What do you call a woman with one leg shorter than the other? Eileen","How many pessimists does it take to change a light bulb? None, it's probably screwed in too tight anyway.","How many Freudian analysts does it take to cange a light bulb? Two, one to change the bulb and one to hold the penis, I mean ladder.","What's the definition of “trust”? Two cannibals giving each other a blowjob.","Confucious he say…  Man who drive like hell bound to get there!","What's got 90 balls and makes women sweat? Bingo.","What's the difference between a hormone and an enzyme? You can't hear an enzyme","Clinton's artful denial: “I didn't put words in her mouth.”","What do you call a man who's been underground for 100 years? Pete","What did the egg say to the boiling water? “It might take me a while to get hard I just got laid last night.”","What does a seventy year-old woman have between her breasts that a twenty year old doesn't? A Navel","Confucious he say…  Man who drop watch in toilet have shitty time.","Confucious he say…  Man who stand on toilet high on pot.","What does DNA stand for? National Association of Dyslexics.","Being punctual in our Office was of no benefit what-so-ever. There was never anybody around to appreciate it.","Confucious he say…  Passionate kiss like spider web – soon lead to undoing of fly.","What do you call a man with a shovel on his head? Doug","How many honest, intelligent, caring men in the world does it take to do the dishes? Both of them.","Why should you never make love to a female astronaut twice? You might burn up on re-entry","How are men and parking spots alike? Good ones are always taken. Free ones are mostly handicapped or extremely small.","What do you call a man with no arms and no legs swimming in the sea? Bob","How many animals can you fit in a pair of stockings? Two Calves, an ass, a pussy, and god knows how many hairs.","What's green and gets you pissed? A Giro","Make it idiot proof and someone will make a better idiot.","Confucious he say…  Man who eat many prunes get good run for money.","One day as I came home early from work ….. I saw a guy jogging naked. Said to the guy, “hey buddy …. why are you doing that?”  He said, “because you came home early.”","Confucious he say…  Man who run behind car get exhausted. Man who run in front of car get tired.","Why did God create Eve? Well somebody had to iron Adam's leaf.","What is the definition of Confidence? When your wife catches you in bed with another woman and you slap her on the ass and say, “You're next!”","Confucious he say…  Man who fart in church must sit in own pew.","What do you call a frenchman with a car on his head? Jacques","Confucious he say…  Foolish man give wife grand piano. Wise man give wife upright organ.","Why do chickens raise one leg when they sleep? Because if they lifted both, they'd fall over.","Confucious he say…  War not determine who right. War determine who left.","Why don't women blink during foreplay? They don't have time.","How many social workers does it take to change a light bulb? None, but it takes 15 to write a paper entitled “coping with darkness”","What is the difference between a frog and a horny toad? One says ribbit ribbit, the other one says rub-it rub it!","Why are married women heavier than single women? Single women come home, see what's in the fridge and go to bed. Married women come home, see what's in bed and go to the fridge.","What do breasts and train sets have in common? They were both designed for babies, but are played with by men.","How did Pinocchio find out he was made of wood? His hand caught fire.","What's the difference between a dead dog in the road and a dead lawyer in the road? There are skid marks in front of the dog.","What do you call a woman with tiles on her head? Ruth","What do you do if your boiler explodes? Buy her some flowers.","What do you call a woman playing pool whilst balancing two pints of lager on her head? Beatrix Potter","Confucious he say…  Wife who put husband in doghouse soon find him in cathouse.","How do you know when you are getting old? When you start having dry dreams and wet farts.","Why does it take 1 million sperm to fertilise one egg? They won't stop to ask directions.","How does a man show that he is planning for the future? He buys two cases of beer.","What do you call a man with a car on his head? Jack","Why are there no ashtrays in Michael Barrymore's House? Cos he chucks all his fags in the pool.","Confucious he say…  Man with hole in pocket feel cocky all day",];
