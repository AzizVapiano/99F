import React from 'react';

const Team = () => {
  const team = [
    {
      name: "Nino.T",
      role: "Maître Tailleur",
      image: "https://cdn.discordapp.com/attachments/1288052046276333571/1358539445942358178/IMG_1114.jpg?ex=67f435f4&is=67f2e474&hm=af2276d944118b3cd9e320912d23641769fabb2a973cd29ce4439b05a67de5d6&",
      description: "Plus de 20 ans d'expérience dans la confection de costumes sur mesure."
    },
    {
      name: "Paul Adrien.D",
      role: "Styliste",
      image: "https://i.imgur.com/w5VNTlA.jpeg",
      description: "Expert en tendances et conseils personnalisés pour nos clients."
    },
    {
      name: "Hugo.L",
      role: "Artisan Bottier",
      image: "https://cdn.discordapp.com/attachments/1288052046276333571/1358540178259706036/IMG_1604.jpg?ex=67f436a2&is=67f2e522&hm=8346db39fc581a0e20f926f8f9b37c2c643bb213919803bd04d571f48e65193c&",
      description: "Spécialiste du travail du cuir et de la fabrication de chaussures sur mesure."
    },
    {
      name: "Antoine.C",
      role: "Responsable Client",
      image: "https://cdn.discordapp.com/attachments/1328685566660968459/1358712384214274161/IMG_3406.png?ex=67f4d704&is=67f38584&hm=ac0e8e52cb8f91c0112fcb8c33d37d057a3c8b677366fdef1549f1d632af7c80&",
      description: "Votre interlocutrice privilégiée pour un service personnalisé."
    }
  ];

  return (
    <div className="py-16 bg-gray-50 mt-28">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-center mb-4">Notre Équipe</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Une équipe d'experts passionnés à votre service pour créer vos tenues sur mesure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-[400px]">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;