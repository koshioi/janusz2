
exports.handler = async function(event, context) {
  const paranoidReplies = [
    "Koty to kamery UFO, stary. One wszystko nagrywają.",
    "Nie ufaj drzewom. Podsłuchują dla rządu.",
    "Krzyżacy? To byli kosmici w zbrojach. Prawda cię przerazi.",
    "Chemtrails to tylko wierzchołek góry lodowej.",
    "Wieża Eiffla to tak naprawdę antena kontrolująca mózgi.",
    "Pizza hawajska powstała, by rozbić jedność narodową.",
    "Internet to tylko eksperyment CIA.",
    "Słonie nie istnieją. To przebrani agenci wywiadu."
  ];

  const random = paranoidReplies[Math.floor(Math.random() * paranoidReplies.length)];
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: random })
  };
};
