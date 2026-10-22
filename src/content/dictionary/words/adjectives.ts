import { a } from "../builders";

const words = [
  a(
    "gut",
    "good; well",
    ["basics"],
    [
      ["Das Essen ist sehr gut.", "The food is very good."],
      ["Mir geht es gut, danke.", "I'm fine, thanks."],
    ],
    { comparative: "besser", superlative: "besten" },
  ),
  a(
    "schlecht",
    "bad",
    ["basics"],
    [
      ["Das Wetter ist heute schlecht.", "The weather is bad today."],
      ["Mir ist schlecht.", "I feel sick."],
    ],
  ),
  a(
    "groß",
    "big, large; tall",
    ["basics", "people"],
    [
      ["Das Haus ist groß.", "The house is big."],
      ["Mein Bruder ist sehr groß.", "My brother is very tall."],
    ],
    { comparative: "größer", superlative: "größten", lessons: ["adjectives-after-sein"] },
  ),
  a(
    "klein",
    "small, little; short",
    ["basics"],
    [
      ["Unsere Wohnung ist klein.", "Our flat is small."],
      ["Wir haben einen kleinen Garten.", "We have a small garden."],
    ],
  ),
  a(
    "alt",
    "old",
    ["basics", "people"],
    [
      ["Wie alt bist du?", "How old are you?"],
      ["Das Haus ist sehr alt.", "The house is very old."],
    ],
    { comparative: "älter", superlative: "ältesten" },
  ),
  a(
    "jung",
    "young",
    ["people"],
    [
      ["Meine Schwester ist jünger als ich.", "My sister is younger than me."],
      ["Er ist noch sehr jung.", "He's still very young."],
    ],
    { comparative: "jünger", superlative: "jüngsten" },
  ),
  a(
    "neu",
    "new",
    ["basics"],
    [
      ["Das Auto ist neu.", "The car is new."],
      ["Ich habe eine neue Arbeit.", "I have a new job."],
    ],
    { lessons: ["adjectives-after-sein"] },
  ),
  a(
    "lang",
    "long",
    ["basics", "time"],
    [
      ["Der Weg ist sehr lang.", "The way is very long."],
      ["Wie lange dauert der Kurs?", "How long does the course last?"],
    ],
    { comparative: "länger", superlative: "längsten" },
  ),
  a(
    "kurz",
    "short",
    ["basics", "time"],
    [
      ["Der Film ist kurz.", "The film is short."],
      ["Warte bitte kurz.", "Please wait a moment."],
    ],
    { comparative: "kürzer", superlative: "kürzesten" },
  ),
  a(
    "hoch",
    "high, tall",
    ["basics"],
    [
      ["Der Berg ist sehr hoch.", "The mountain is very high."],
      ["Die Miete ist zu hoch.", "The rent is too high."],
    ],
    {
      comparative: "höher",
      superlative: "höchsten",
      note: "Before a noun, hoch loses its c: ein hoher Berg.",
    },
  ),
  a(
    "warm",
    "warm",
    ["weather"],
    [
      ["Heute ist es warm.", "It's warm today."],
      ["Zieh dich warm an!", "Dress warmly!"],
    ],
    { comparative: "wärmer", superlative: "wärmsten" },
  ),
  a(
    "kalt",
    "cold",
    ["weather", "food"],
    [
      ["Im Winter ist es kalt.", "It's cold in winter."],
      ["Der Kaffee ist kalt.", "The coffee is cold."],
    ],
    { comparative: "kälter", superlative: "kältesten", lessons: ["adjectives-after-sein"] },
  ),
  a(
    "heiß",
    "hot",
    ["weather", "food"],
    [
      ["Im Sommer ist es sehr heiß.", "It's very hot in summer."],
      ["Vorsicht, die Suppe ist heiß!", "Careful, the soup is hot!"],
    ],
  ),
  a(
    "schön",
    "beautiful, nice",
    ["basics"],
    [
      ["Das Wetter ist heute schön.", "The weather is nice today."],
      ["Köln ist eine schöne Stadt.", "Cologne is a beautiful city."],
    ],
  ),
  a(
    "teuer",
    "expensive",
    ["shopping"],
    [
      ["Die Schuhe sind zu teuer.", "The shoes are too expensive."],
      ["München ist teurer als Leipzig.", "Munich is more expensive than Leipzig."],
    ],
    { lessons: ["adjectives-after-sein", "vocab-shopping"] },
  ),
  a(
    "billig",
    "cheap",
    ["shopping"],
    [
      ["Das T-Shirt ist billig.", "The T-shirt is cheap."],
      ["Hier ist das Obst billiger.", "The fruit is cheaper here."],
    ],
  ),
  a(
    "günstig",
    "good value, reasonably priced",
    ["shopping"],
    [
      ["Das Hotel ist günstig.", "The hotel is good value."],
      ["Die Wohnung ist günstig und hell.", "The flat is reasonably priced and bright."],
    ],
  ),
  a(
    "schnell",
    "fast, quick",
    ["basics"],
    [
      ["Der Zug ist sehr schnell.", "The train is very fast."],
      ["Komm schnell!", "Come quickly!"],
    ],
  ),
  a(
    "langsam",
    "slow",
    ["basics"],
    [
      ["Sprechen Sie bitte langsam.", "Please speak slowly."],
      ["Der Bus ist langsamer als die U-Bahn.", "The bus is slower than the underground."],
    ],
    { lessons: ["imperative"] },
  ),
  a(
    "laut",
    "loud, noisy",
    ["home"],
    [
      ["Die Musik ist zu laut.", "The music is too loud."],
      ["Die Straße ist sehr laut.", "The street is very noisy."],
    ],
  ),
  a(
    "leise",
    "quiet, soft",
    ["home"],
    [
      ["Sprich bitte leise, das Baby schläft.", "Please speak quietly, the baby is sleeping."],
      ["Die Musik ist zu leise.", "The music is too quiet."],
    ],
  ),
  a(
    "hell",
    "bright, light",
    ["home"],
    [
      ["Die Küche ist klein, aber hell.", "The kitchen is small but bright."],
      ["Im Sommer ist es lange hell.", "In summer it stays light for a long time."],
    ],
  ),
  a(
    "dunkel",
    "dark",
    ["home", "weather"],
    [
      ["Im Winter wird es früh dunkel.", "In winter it gets dark early."],
      ["Das Zimmer ist sehr dunkel.", "The room is very dark."],
    ],
  ),
  a(
    "ruhig",
    "quiet, calm",
    ["home"],
    [
      ["Die Wohnung ist hell und ruhig.", "The flat is bright and quiet."],
      ["Bleib ruhig!", "Stay calm!"],
    ],
  ),
  a(
    "gesund",
    "healthy",
    ["health", "food"],
    [
      ["Obst ist gesund.", "Fruit is healthy."],
      ["Bist du wieder gesund?", "Are you well again?"],
    ],
    { comparative: "gesünder", superlative: "gesündesten" },
  ),
  a(
    "krank",
    "ill, sick",
    ["health"],
    [
      ["Ich bin krank und kann nicht kommen.", "I'm ill and can't come."],
      ["Mein Sohn ist seit Montag krank.", "My son has been ill since Monday."],
    ],
    { comparative: "kränker", superlative: "kränksten", lessons: ["vocab-health"] },
  ),
  a(
    "müde",
    "tired",
    ["health", "routine"],
    [
      ["Ich bin sehr müde.", "I'm very tired."],
      ["Bist du nicht müde?", "Aren't you tired?"],
    ],
    { lessons: ["nicht-kein", "sein-und-haben"] },
  ),
  a(
    "glücklich",
    "happy",
    ["people"],
    [
      ["Sie ist sehr glücklich.", "She's very happy."],
      ["Wir sind glücklich in Berlin.", "We're happy in Berlin."],
    ],
  ),
  a(
    "traurig",
    "sad",
    ["people"],
    [
      ["Warum bist du traurig?", "Why are you sad?"],
      ["Der Film ist sehr traurig.", "The film is very sad."],
    ],
  ),
  a(
    "froh",
    "glad, happy",
    ["people"],
    [
      ["Ich bin froh, dass du da bist.", "I'm glad you're here."],
      ["Frohe Weihnachten!", "Merry Christmas!"],
    ],
  ),
  a(
    "nett",
    "nice, kind",
    ["people"],
    [
      ["Die Nachbarn sind sehr nett.", "The neighbours are very nice."],
      ["Das ist nett von dir.", "That's kind of you."],
    ],
  ),
  a(
    "freundlich",
    "friendly",
    ["people"],
    [
      ["Die Leute hier sind sehr freundlich.", "The people here are very friendly."],
      ["Mit freundlichen Grüßen", "Kind regards"],
    ],
  ),
  a(
    "lustig",
    "funny, fun",
    ["people", "leisure"],
    [
      ["Der Film ist sehr lustig.", "The film is very funny."],
      ["Die Party war lustig.", "The party was fun."],
    ],
  ),
  a(
    "interessant",
    "interesting",
    ["basics"],
    [
      ["Das Buch ist sehr interessant.", "The book is very interesting."],
      ["Das finde ich interessant.", "I find that interesting."],
    ],
  ),
  a(
    "langweilig",
    "boring",
    ["basics"],
    [
      ["Der Film war langweilig.", "The film was boring."],
      ["Mir ist langweilig.", "I'm bored."],
    ],
  ),
  a(
    "leicht",
    "easy; light (weight)",
    ["school"],
    [
      ["Die Prüfung war leicht.", "The exam was easy."],
      ["Die Tasche ist ganz leicht.", "The bag is quite light."],
    ],
  ),
  a(
    "schwer",
    "difficult; heavy",
    ["school"],
    [
      ["Deutsch ist nicht so schwer.", "German isn't that hard."],
      ["Mein Koffer ist zu schwer.", "My suitcase is too heavy."],
    ],
  ),
  a(
    "einfach",
    "simple, easy",
    ["school"],
    [
      ["Die Aufgabe ist einfach.", "The task is simple."],
      ["Das ist ganz einfach.", "That's really easy."],
    ],
  ),
  a(
    "schwierig",
    "difficult",
    ["school"],
    [
      ["Die Grammatik ist schwierig.", "The grammar is difficult."],
      ["Das ist eine schwierige Frage.", "That's a difficult question."],
    ],
  ),
  a(
    "wichtig",
    "important",
    ["basics"],
    [
      ["Das ist sehr wichtig.", "That's very important."],
      ["Gesundheit ist wichtiger als Geld.", "Health is more important than money."],
    ],
  ),
  a(
    "richtig",
    "right, correct",
    ["school"],
    [
      ["Die Antwort ist richtig.", "The answer is right."],
      ["Kreuzen Sie an: richtig oder falsch?", "Tick: true or false?"],
    ],
    { noComparison: true, lessons: ["exam-overview"] },
  ),
  a(
    "falsch",
    "wrong, false",
    ["school"],
    [
      ["Das ist leider falsch.", "Unfortunately that's wrong."],
      ["Sie haben die falsche Nummer.", "You have the wrong number."],
    ],
    { noComparison: true, lessons: ["exam-overview"] },
  ),
  a(
    "fertig",
    "ready, finished",
    ["basics"],
    [
      ["Das Essen ist fertig.", "The food is ready."],
      ["Bist du fertig?", "Are you finished?"],
    ],
    { noComparison: true },
  ),
  a(
    "frei",
    "free; vacant; off (work)",
    ["basics", "leisure"],
    [
      ["Ist der Platz noch frei?", "Is this seat free?"],
      ["Morgen habe ich frei.", "I'm off tomorrow."],
    ],
    { lessons: ["time-adverbs"] },
  ),
  a(
    "besetzt",
    "taken, occupied; engaged",
    ["basics"],
    [
      ["Der Platz ist besetzt.", "This seat is taken."],
      ["Die Toilette ist besetzt.", "The toilet is occupied."],
    ],
    { noComparison: true },
  ),
  a(
    "offen",
    "open",
    ["shopping", "home"],
    [
      ["Die Tür ist offen.", "The door is open."],
      ["Ist die Bank heute offen?", "Is the bank open today?"],
    ],
    { noComparison: true },
  ),
  a(
    "kaputt",
    "broken",
    ["home"],
    [
      ["Mein Handy ist kaputt.", "My phone is broken."],
      ["Der Aufzug ist kaputt.", "The lift is out of order."],
    ],
    { noComparison: true },
  ),
  a(
    "sauber",
    "clean",
    ["home"],
    [
      ["Die Küche ist sauber.", "The kitchen is clean."],
      ["Das Hotelzimmer war sehr sauber.", "The hotel room was very clean."],
    ],
  ),
  a(
    "schmutzig",
    "dirty",
    ["home"],
    [
      ["Die Schuhe sind schmutzig.", "The shoes are dirty."],
      ["Das Fenster ist schmutzig.", "The window is dirty."],
    ],
  ),
  a(
    "voll",
    "full",
    ["basics"],
    [
      ["Der Bus ist sehr voll.", "The bus is very full."],
      ["Ich bin voll, danke.", "I'm full, thanks."],
    ],
  ),
  a(
    "leer",
    "empty",
    ["basics"],
    [
      ["Der Kühlschrank ist leer.", "The fridge is empty."],
      ["Die Flasche ist leer.", "The bottle is empty."],
    ],
  ),
  a(
    "lecker",
    "tasty, delicious",
    ["food"],
    [
      ["Das Essen ist sehr lecker.", "The food is very tasty."],
      ["Der Kuchen war lecker!", "The cake was delicious!"],
    ],
  ),
  a(
    "süß",
    "sweet; cute",
    ["food"],
    [
      ["Der Kuchen ist sehr süß.", "The cake is very sweet."],
      ["Das Baby ist so süß!", "The baby is so cute!"],
    ],
  ),
  a(
    "scharf",
    "spicy, hot; sharp",
    ["food"],
    [
      ["Das Curry ist sehr scharf.", "The curry is very spicy."],
      ["Isst du gern scharf?", "Do you like spicy food?"],
    ],
    { comparative: "schärfer", superlative: "schärfsten", lessons: ["gern-lieber"] },
  ),
  a(
    "frisch",
    "fresh",
    ["food"],
    [
      ["Das Brot ist frisch.", "The bread is fresh."],
      ["Ich kaufe frisches Gemüse auf dem Markt.", "I buy fresh vegetables at the market."],
    ],
  ),
  a(
    "bequem",
    "comfortable",
    ["home", "shopping"],
    [
      ["Das Sofa ist sehr bequem.", "The sofa is very comfortable."],
      ["Die Schuhe sind bequem.", "The shoes are comfortable."],
    ],
  ),
  a(
    "modern",
    "modern",
    ["home"],
    [
      ["Das Bad ist klein, aber modern.", "The bathroom is small but modern."],
      ["Die Wohnung ist sehr modern.", "The flat is very modern."],
    ],
  ),
  a(
    "toll",
    "great, brilliant",
    ["basics"],
    [
      ["Das Konzert war toll!", "The concert was great!"],
      ["Das ist eine tolle Idee.", "That's a great idea."],
    ],
  ),
  a(
    "weit",
    "far; wide",
    ["travel"],
    [
      ["Ist der Bahnhof weit?", "Is the station far?"],
      ["Der Flughafen ist weit weg.", "The airport is a long way away."],
    ],
  ),
  a(
    "nah",
    "near, close",
    ["travel"],
    [
      ["Der Supermarkt ist ganz nah.", "The supermarket is very close."],
      ["Wo ist die nächste Haltestelle?", "Where's the nearest stop?"],
    ],
    { comparative: "näher", superlative: "nächsten" },
  ),
  a(
    "früh",
    "early",
    ["time"],
    [
      ["Wir müssen morgen früh aufstehen.", "We have to get up early tomorrow."],
      ["Es ist noch zu früh.", "It's still too early."],
    ],
    { lessons: ["modal-verbs"] },
  ),
  a(
    "spät",
    "late",
    ["time"],
    [
      ["Wie spät ist es?", "What time is it?"],
      ["Es ist schon spät.", "It's already late."],
    ],
    { lessons: ["telling-time"] },
  ),
  a(
    "pünktlich",
    "on time, punctual",
    ["time", "travel"],
    [
      ["Der Zug ist pünktlich.", "The train is on time."],
      ["Bitte seien Sie pünktlich.", "Please be on time."],
    ],
    { lessons: ["perfekt"] },
  ),
  a(
    "verheiratet",
    "married",
    ["family"],
    [
      ["Ich bin verheiratet und habe zwei Kinder.", "I'm married with two children."],
      ["Seit wann bist du verheiratet?", "How long have you been married?"],
    ],
    { noComparison: true, lessons: ["vocab-family"] },
  ),
  a(
    "ledig",
    "single, unmarried",
    ["family"],
    [
      ["Ich bin ledig.", "I'm single."],
      ["Familienstand: ledig", "Marital status: single"],
    ],
    { noComparison: true },
  ),
  a(
    "stark",
    "strong",
    ["people", "weather"],
    [
      ["Der Kaffee ist sehr stark.", "The coffee is very strong."],
      ["Heute ist der Wind stark.", "The wind is strong today."],
    ],
    { comparative: "stärker", superlative: "stärksten" },
  ),
  a(
    "dick",
    "thick; fat",
    ["people"],
    [
      ["Das Buch ist sehr dick.", "The book is very thick."],
      ["Die Katze ist ein bisschen dick.", "The cat is a bit fat."],
    ],
  ),
  a(
    "dünn",
    "thin",
    ["people"],
    [
      ["Die Wände sind sehr dünn.", "The walls are very thin."],
      ["Er ist groß und dünn.", "He's tall and thin."],
    ],
  ),
  a(
    "rot",
    "red",
    ["shopping"],
    [
      ["Die Ampel ist rot.", "The light is red."],
      ["Sie trägt ein rotes Kleid.", "She's wearing a red dress."],
    ],
    { noComparison: true },
  ),
  a(
    "blau",
    "blue",
    ["shopping"],
    [
      ["Der Himmel ist blau.", "The sky is blue."],
      ["Er trägt eine blaue Jacke.", "He's wearing a blue jacket."],
    ],
    { noComparison: true },
  ),
  a(
    "grün",
    "green",
    ["shopping", "weather"],
    [
      ["Die Bananen sind noch grün.", "The bananas are still green."],
      ["Die Ampel ist grün. Wir können gehen.", "The light is green. We can go."],
    ],
    { noComparison: true },
  ),
  a(
    "gelb",
    "yellow",
    ["shopping"],
    [
      ["Die Banane ist gelb.", "The banana is yellow."],
      ["Ich habe ein gelbes T-Shirt.", "I have a yellow T-shirt."],
    ],
    { noComparison: true },
  ),
  a(
    "schwarz",
    "black",
    ["shopping"],
    [
      ["Ich trinke meinen Kaffee schwarz.", "I drink my coffee black."],
      ["Ich trage eine schwarze Hose.", "I'm wearing black trousers."],
    ],
    { noComparison: true },
  ),
  a(
    "weiß",
    "white",
    ["shopping"],
    [
      ["Die Wände sind weiß.", "The walls are white."],
      ["Er trägt ein weißes Hemd.", "He's wearing a white shirt."],
    ],
    { noComparison: true },
  ),
  a(
    "grau",
    "grey",
    ["shopping", "weather"],
    [
      ["Im November ist es grau.", "It's grey in November."],
      ["Mein Opa hat graue Haare.", "My grandpa has grey hair."],
    ],
    { noComparison: true },
  ),
  a(
    "braun",
    "brown",
    ["shopping"],
    [
      ["Sie hat braune Augen.", "She has brown eyes."],
      ["Der Tisch ist braun.", "The table is brown."],
    ],
    { noComparison: true },
  ),
];

export default words;
