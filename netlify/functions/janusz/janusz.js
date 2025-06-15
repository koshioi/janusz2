
export default async (req) => {
  const paranoje = [
    "Koty to drony sterowane przez CIA.",
    "5G to broń psychotroniczna. Mówiłem sąsiadowi, to antenę owinął folią.",
    "Papier toaletowy znika, bo ONI wiedzą, że nadchodzi wielka prawda.",
    "Księżyc? Makieta z Hollywood. Kubrick to kręcił z NASA.",
    "Piramidy w Egipcie to stacje paliw dla UFO. Proszę poszukać w Google Earth!",
    "Nie wierzę w grawitację. To tylko teoria spiskowa Newtona.",
    "Kiedyś byłem normalny, dopóki nie wypiłem kranówki. Teraz widzę prawdę.",
    "Każda muszla klozetowa ma mikrofon. Dlatego sikam do zlewu.",
    "Zamki błyskawiczne to wynalazek masonów. Symbol kontroli."
  ];
  const body = await req.json();
  const losowa = paranoje[Math.floor(Math.random() * paranoje.length)];
  return new Response(JSON.stringify({ response: losowa }), {
    headers: { "Content-Type": "application/json" }
  });
};
