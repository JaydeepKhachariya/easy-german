import { n } from "../builders";

const day = (word: string, en: string, ex: [string, string][]) =>
  n("der", word, `${word}e`, en, ["time"], ex, { lessons: ["days-months-dates"] });
const month = (word: string, en: string, ex: [string, string][]) =>
  n("der", word, null, en, ["time"], ex, { lessons: ["days-months-dates"] });

const words = [
  n(
    "die",
    "Zeit",
    "Zeiten",
    "time",
    ["time"],
    [
      ["Ich habe heute keine Zeit.", "I have no time today."],
      ["Hast du Zeit am Samstag?", "Do you have time on Saturday?"],
    ],
    { lessons: ["nicht-kein"] },
  ),
  n(
    "die",
    "Uhr",
    "Uhren",
    "clock, watch; o'clock",
    ["time"],
    [
      ["Es ist drei Uhr.", "It's three o'clock."],
      ["Meine Uhr ist kaputt.", "My watch is broken."],
    ],
    { lessons: ["telling-time"], note: "In times, Uhr stays singular: zwei Uhr." },
  ),
  n(
    "die",
    "Stunde",
    "Stunden",
    "hour; lesson",
    ["time"],
    [
      ["Der Film dauert zwei Stunden.", "The film lasts two hours."],
      ["Ich arbeite 40 Stunden pro Woche.", "I work 40 hours a week."],
    ],
  ),
  n(
    "die",
    "Minute",
    "Minuten",
    "minute",
    ["time"],
    [
      ["Der Bus kommt in fünf Minuten.", "The bus is coming in five minutes."],
      ["Warte bitte eine Minute.", "Please wait a minute."],
    ],
  ),
  n(
    "der",
    "Tag",
    "Tage",
    "day",
    ["time"],
    [
      ["Guten Tag!", "Hello!"],
      ["Ich lerne jeden Tag Deutsch.", "I learn German every day."],
    ],
    { genitive: "es" },
  ),
  n(
    "die",
    "Woche",
    "Wochen",
    "week",
    ["time"],
    [
      ["Die Woche hat sieben Tage.", "The week has seven days."],
      ["Nächste Woche habe ich Urlaub.", "Next week I'm on holiday."],
    ],
  ),
  n(
    "der",
    "Monat",
    "Monate",
    "month",
    ["time"],
    [
      ["Der Kurs dauert drei Monate.", "The course lasts three months."],
      ["Nächsten Monat ziehe ich um.", "I'm moving next month."],
    ],
  ),
  n(
    "das",
    "Jahr",
    "Jahre",
    "year",
    ["time"],
    [
      ["Ich bin 28 Jahre alt.", "I'm 28 years old."],
      ["Frohes neues Jahr!", "Happy New Year!"],
    ],
    { genitive: "es", lessons: ["numbers"] },
  ),
  n(
    "das",
    "Wochenende",
    "Wochenenden",
    "weekend",
    ["time", "leisure"],
    [
      ["Was machst du am Wochenende?", "What are you doing at the weekend?"],
      ["Schönes Wochenende!", "Have a nice weekend!"],
    ],
    { lessons: ["verb-position-2"] },
  ),
  n(
    "der",
    "Morgen",
    "Morgen",
    "morning",
    ["time"],
    [
      ["Guten Morgen!", "Good morning!"],
      ["Am Morgen trinke ich Kaffee.", "In the morning I drink coffee."],
    ],
    { id: "der-morgen", note: "morgen (small m) means tomorrow." },
  ),
  n(
    "der",
    "Vormittag",
    "Vormittage",
    "morning (until noon)",
    ["time"],
    [
      ["Am Vormittag arbeite ich.", "I work in the morning."],
      ["Ich rufe Sie am Vormittag an.", "I'll call you in the morning."],
    ],
  ),
  n(
    "der",
    "Mittag",
    "Mittage",
    "midday, noon",
    ["time"],
    [
      ["Wir essen um zwölf Uhr zu Mittag.", "We have lunch at twelve."],
      ["Am Mittag ist der Laden geschlossen.", "The shop is closed at midday."],
    ],
  ),
  n(
    "der",
    "Nachmittag",
    "Nachmittage",
    "afternoon",
    ["time"],
    [
      ["Am Nachmittag gehe ich einkaufen.", "In the afternoon I go shopping."],
      ["Der Termin ist am Nachmittag.", "The appointment is in the afternoon."],
    ],
  ),
  n(
    "der",
    "Abend",
    "Abende",
    "evening",
    ["time"],
    [
      ["Guten Abend!", "Good evening!"],
      ["Am Abend sehe ich fern.", "In the evening I watch TV."],
    ],
    { lessons: ["verb-position-2"] },
  ),
  n(
    "die",
    "Nacht",
    "Nächte",
    "night",
    ["time"],
    [
      ["Gute Nacht!", "Good night!"],
      ["Ich möchte ein Zimmer für zwei Nächte.", "I'd like a room for two nights."],
    ],
  ),
  n(
    "der",
    "Termin",
    "Termine",
    "appointment",
    ["time", "work", "health"],
    [
      ["Ich habe am Dienstag einen Termin.", "I have an appointment on Tuesday."],
      ["Ich möchte einen Termin beim Arzt.", "I'd like a doctor's appointment."],
    ],
    { lessons: ["days-months-dates"] },
  ),
  n(
    "das",
    "Datum",
    "Daten",
    "date",
    ["time"],
    [
      ["Welches Datum ist heute?", "What's the date today?"],
      ["Schreiben Sie das Datum oben rechts.", "Write the date at the top right."],
    ],
  ),
  day("Montag", "Monday", [
    ["Am Montag fängt der Kurs an.", "The course starts on Monday."],
    ["Montags arbeite ich im Büro.", "On Mondays I work at the office."],
  ]),
  day("Dienstag", "Tuesday", [
    ["Am Dienstag habe ich einen Termin.", "I have an appointment on Tuesday."],
    ["Heute ist Dienstag.", "Today is Tuesday."],
  ]),
  day("Mittwoch", "Wednesday", [
    ["Am Mittwoch ist die Praxis zu.", "The surgery is closed on Wednesday."],
    ["Bis Mittwoch!", "See you on Wednesday!"],
  ]),
  day("Donnerstag", "Thursday", [
    ["Am Donnerstag gehen wir ins Kino.", "On Thursday we're going to the cinema."],
    ["Ist heute Donnerstag?", "Is it Thursday today?"],
  ]),
  day("Freitag", "Friday", [
    ["Am Freitag essen wir Fisch.", "On Friday we eat fish."],
    ["Freitags arbeite ich nur bis zwei.", "On Fridays I only work until two."],
  ]),
  day("Samstag", "Saturday", [
    ["Am Samstag spielen wir Fußball.", "On Saturday we play football."],
    ["Am Samstag kaufe ich ein.", "On Saturday I do the shopping."],
  ]),
  day("Sonntag", "Sunday", [
    ["Am Sonntag schlafe ich lange.", "On Sunday I sleep in."],
    ["Sonntags sind die Geschäfte zu.", "On Sundays the shops are closed."],
  ]),
  month("Januar", "January", [
    ["Im Januar ist es kalt.", "It's cold in January."],
    ["Mein Geburtstag ist im Januar.", "My birthday is in January."],
  ]),
  month("Februar", "February", [
    ["Der Februar hat 28 Tage.", "February has 28 days."],
    ["Im Februar fliege ich nach Indien.", "In February I'm flying to India."],
  ]),
  month("März", "March", [
    ["Im März beginnt der Frühling.", "Spring begins in March."],
    ["Der Kurs endet im März.", "The course ends in March."],
  ]),
  month("April", "April", [
    ["Im April regnet es oft.", "It often rains in April."],
    ["Ich habe im April Urlaub.", "I'm on holiday in April."],
  ]),
  month("Mai", "May", [
    ["Heute ist der dritte Mai.", "Today is the third of May."],
    ["Im Mai ist es schön warm.", "In May it's nice and warm."],
  ]),
  month("Juni", "June", [
    ["Mein Geburtstag ist im Juni.", "My birthday is in June."],
    ["Die Prüfung ist im Juni.", "The exam is in June."],
  ]),
  month("Juli", "July", [
    ["Im Juli machen wir Urlaub.", "In July we go on holiday."],
    ["Der Juli ist sehr heiß.", "July is very hot."],
  ]),
  month("August", "August", [
    ["Ich bin im August geboren.", "I was born in August."],
    ["Im August sind Ferien.", "The holidays are in August."],
  ]),
  month("September", "September", [
    ["Der Kurs beginnt im September.", "The course starts in September."],
    ["Im September ist das Wetter noch gut.", "In September the weather is still good."],
  ]),
  month("Oktober", "October", [
    ["Im Oktober ziehe ich um.", "I'm moving in October."],
    ["Der Oktober ist oft windig.", "October is often windy."],
  ]),
  month("November", "November", [
    ["Im November ist es grau.", "It's grey in November."],
    ["Wir sehen uns im November.", "We'll see each other in November."],
  ]),
  month("Dezember", "December", [
    ["Im Dezember ist es kalt.", "It's cold in December."],
    ["Im Dezember schneit es manchmal.", "It sometimes snows in December."],
  ]),
  n(
    "der",
    "Frühling",
    null,
    "spring",
    ["time", "weather"],
    [
      ["Im Frühling blühen die Blumen.", "The flowers bloom in spring."],
      ["Der Frühling ist meine Lieblingsjahreszeit.", "Spring is my favourite season."],
    ],
  ),
  n(
    "der",
    "Sommer",
    "Sommer",
    "summer",
    ["time", "weather"],
    [
      ["Im Sommer fahren wir ans Meer.", "In summer we go to the seaside."],
      ["Der Sommer war sehr heiß.", "The summer was very hot."],
    ],
  ),
  n(
    "der",
    "Herbst",
    "Herbste",
    "autumn, fall",
    ["time", "weather"],
    [
      ["Im Herbst ist es oft windig.", "It's often windy in autumn."],
      ["Im Herbst fängt die Schule an.", "School starts in autumn."],
    ],
    { genitive: "es" },
  ),
  n(
    "der",
    "Winter",
    "Winter",
    "winter",
    ["time", "weather"],
    [
      ["Im Winter schneit es.", "It snows in winter."],
      ["Der Winter in Berlin ist lang.", "Winter in Berlin is long."],
    ],
  ),
  n(
    "das",
    "Wetter",
    null,
    "weather",
    ["weather"],
    [
      ["Wie ist das Wetter heute?", "What's the weather like today?"],
      ["Das Wetter war schön.", "The weather was nice."],
    ],
    { lessons: ["praeteritum-sein-haben"] },
  ),
  n(
    "die",
    "Sonne",
    "Sonnen",
    "sun",
    ["weather"],
    [
      ["Die Sonne scheint.", "The sun is shining."],
      ["Wir sitzen in der Sonne.", "We're sitting in the sun."],
    ],
  ),
  n(
    "der",
    "Regen",
    null,
    "rain",
    ["weather"],
    [
      ["Morgen gibt es Regen.", "There will be rain tomorrow."],
      ["Ich gehe nicht gern im Regen spazieren.", "I don't like walking in the rain."],
    ],
  ),
  n(
    "der",
    "Schnee",
    null,
    "snow",
    ["weather"],
    [
      ["Die Kinder spielen im Schnee.", "The children are playing in the snow."],
      ["Im Winter gibt es viel Schnee.", "There's a lot of snow in winter."],
    ],
  ),
  n(
    "der",
    "Wind",
    "Winde",
    "wind",
    ["weather"],
    [
      ["Der Wind ist sehr stark.", "The wind is very strong."],
      ["Heute gibt es viel Wind.", "It's very windy today."],
    ],
    { genitive: "es" },
  ),
  n(
    "die",
    "Wolke",
    "Wolken",
    "cloud",
    ["weather"],
    [
      ["Am Himmel sind viele Wolken.", "There are lots of clouds in the sky."],
      ["Die Wolken sind schwarz. Es regnet bald.", "The clouds are black. It'll rain soon."],
    ],
  ),
  n(
    "das",
    "Grad",
    "Grad",
    "degree",
    ["weather"],
    [
      ["Heute sind es 30 Grad.", "It's 30 degrees today."],
      ["In der Nacht sind es minus fünf Grad.", "At night it's minus five degrees."],
    ],
    { genitive: "es" },
  ),
  n(
    "die",
    "Temperatur",
    "Temperaturen",
    "temperature",
    ["weather", "health"],
    [
      ["Die Temperatur ist heute angenehm.", "The temperature is pleasant today."],
      ["Morgen steigen die Temperaturen.", "Temperatures will rise tomorrow."],
    ],
    { level: "A2" },
  ),
  n(
    "der",
    "Berg",
    "Berge",
    "mountain",
    ["weather", "leisure"],
    [
      ["Wir wandern in den Bergen.", "We hike in the mountains."],
      ["Der Berg ist sehr hoch.", "The mountain is very high."],
    ],
    { genitive: "es" },
  ),
  n(
    "der",
    "See",
    "Seen",
    "lake",
    ["weather", "leisure"],
    [
      ["Im Sommer schwimmen wir im See.", "In summer we swim in the lake."],
      ["Der See ist sehr schön.", "The lake is very beautiful."],
    ],
    { note: "die See (feminine) means the sea." },
  ),
  n(
    "das",
    "Meer",
    "Meere",
    "sea",
    ["weather", "leisure"],
    [
      ["Wir machen Urlaub am Meer.", "We're on holiday by the sea."],
      ["Das Meer ist heute ruhig.", "The sea is calm today."],
    ],
    { genitive: "es" },
  ),
  n(
    "der",
    "Fluss",
    "Flüsse",
    "river",
    ["weather"],
    [
      ["Köln liegt an einem großen Fluss.", "Cologne is on a big river."],
      ["Der Fluss heißt Rhein.", "The river is called the Rhine."],
    ],
  ),
  n(
    "der",
    "Baum",
    "Bäume",
    "tree",
    ["weather"],
    [
      ["Vor dem Haus steht ein großer Baum.", "There's a big tree in front of the house."],
      ["Im Herbst verlieren die Bäume ihre Blätter.", "In autumn the trees lose their leaves."],
    ],
    { genitive: "es" },
  ),
  n(
    "die",
    "Blume",
    "Blumen",
    "flower",
    ["weather", "shopping"],
    [
      ["Ich kaufe Blumen für meine Mutter.", "I'm buying flowers for my mother."],
      ["Die Blumen sind sehr schön.", "The flowers are very beautiful."],
    ],
    { lessons: ["akkusativ-prepositions"] },
  ),
  n(
    "das",
    "Tier",
    "Tiere",
    "animal",
    ["weather"],
    [
      ["Hast du ein Tier?", "Do you have a pet?"],
      ["Im Zoo gibt es viele Tiere.", "There are many animals in the zoo."],
    ],
    { genitive: "es" },
  ),
  n(
    "der",
    "Hund",
    "Hunde",
    "dog",
    ["weather", "home"],
    [
      ["Wir haben einen Hund.", "We have a dog."],
      ["Der Hund spielt im Garten.", "The dog is playing in the garden."],
    ],
    { genitive: "es", lessons: ["nicht-kein"] },
  ),
  n(
    "die",
    "Katze",
    "Katzen",
    "cat",
    ["weather", "home"],
    [
      ["Die Katze schläft auf dem Sofa.", "The cat is sleeping on the sofa."],
      ["Magst du Katzen?", "Do you like cats?"],
    ],
  ),
];

export default words;
