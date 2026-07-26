export interface PrayerStep {
  label: string;
  text: string;
}

export interface PrayerSection {
  title: string;
  steps: PrayerStep[];
}

export interface Prayer {
  id: string;
  title: string;
  description: string;
  type: 'internal' | 'external';
  externalUrl?: string;
  sections: PrayerSection[];
}

export const prayers: Prayer[] = [
  {
    id: 'divine-mercy',
    title: 'The Chaplet of Divine Mercy',
    description:
      'revealed by our Lord to St. Faustina Kowalska. It is said on ordinary rosary beads and is a prayer of trust in God\'s mercy.',
    type: 'internal',
    sections: [
      {
        title: 'Opening Prayers',
        steps: [
          {
            label: 'Sign of the Cross',
            text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
          },
          {
            label: 'O God (for mercy\'s sake)',
            text: 'O God, for mercy\'s sake, have mercy on us and lead all souls to heaven, especially those in most need of Thy mercy. Amen.',
          },
          {
            label: 'The Apostles\' Creed',
            text: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'O My Jesus',
            text: 'O My Jesus, have mercy on us and on the whole world. Amen.',
          },
        ],
      },
      {
        title: 'First Decade',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (10 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'Holy God (3 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Second Decade',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (10 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'Holy God (3 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Third Decade',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (10 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'Holy God (3 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Fourth Decade',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (10 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'Holy God (3 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Fifth Decade',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (10 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'Holy God (3 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Closing Prayers',
        steps: [
          {
            label: 'Holy God (3 times)',
            text: 'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.',
          },
          {
            label: 'O Blood and Water',
            text: 'O Blood and Water, which gushed forth from the Heart of Jesus as a fount of Mercy for us, I trust in You.',
          },
          {
            label: 'O God, in Whom Mercy is Endless',
            text: 'O God, in whom mercy is endless and the treasury of compassion inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy itself. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'st-michael',
    title: 'The Chaplet of St. Michael',
    description:
      'A chaplet of prayers honoring the nine choirs of angels, revealed to St. Mechtilde in the 13th century.',
    type: 'internal',
    sections: [
      {
        title: 'Opening Prayer',
        steps: [
          {
            label: 'Sign of the Cross',
            text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
          },
          {
            label: 'O God, Come to My Assistance',
            text: 'O God, come to my assistance; O Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
        ],
      },
      {
        title: 'First Salutation — To the Seraphim',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Seraphim',
            text: 'By the intercession of St. Michael and the celestial choir of Seraphim may the Lord make us worthy to burn with the fire of perfect charity. Amen.',
          },
        ],
      },
      {
        title: 'Second Salutation — To the Cherubim',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Cherubim',
            text: 'By the intercession of St. Michael and the celestial choir of Cherubim may the Lord grant us the grace to leave the ways of sin and run in the paths of Christian perfection. Amen.',
          },
        ],
      },
      {
        title: 'Third Salutation — To the Thrones',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Thrones',
            text: 'By the intercession of St. Michael and the celestial choir of Thrones may the Lord infuse into our hearts a true and humble spirit. Amen.',
          },
        ],
      },
      {
        title: 'Fourth Salutation — To the Dominations',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Dominations',
            text: 'By the intercession of St. Michael and the celestial choir of Dominations may the Lord give us grace to govern our senses and overcome our unruly passions. Amen.',
          },
        ],
      },
      {
        title: 'Fifth Salutation — To the Powers',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Powers',
            text: 'By the intercession of St. Michael and the celestial choir of Powers may the Lord protect our souls against the snares and temptations of the devil. Amen.',
          },
        ],
      },
      {
        title: 'Sixth Salutation — To the Virtues',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Virtues',
            text: 'By the intercession of St. Michael and the celestial choir of Virtues may the Lord preserve us from evil and falling into temptation. Amen.',
          },
        ],
      },
      {
        title: 'Seventh Salutation — To the Principalities',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Principalities',
            text: 'By the intercession of St. Michael and the celestial choir of Principalities may the Lord give us grace to govern our flesh and keep subject all our senses. Amen.',
          },
        ],
      },
      {
        title: 'Eighth Salutation — To the Archangels',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Archangels',
            text: 'By the intercession of St. Michael and the celestial choir of Archangels may the Lord give us perseverance in faith and in all good works in order that we may attain the glory of heaven. Amen.',
          },
        ],
      },
      {
        title: 'Ninth Salutation — To the Angels',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'Glory Be',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
          {
            label: 'Prayer to the Angels',
            text: 'By the intercession of St. Michael and the celestial choir of Angels may the Lord grant us to be protected by them in this mortal life and conducted in the life to come to heaven. Amen.',
          },
        ],
      },
      {
        title: 'Closing Prayers',
        steps: [
          {
            label: 'Prayer to St. Michael',
            text: 'St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.',
          },
          {
            label: 'Prayer to St. Gabriel',
            text: 'St. Gabriel the Archangel, I ask you to intercede for me and all those I love. Please bring my prayers before the throne of God. Amen.',
          },
          {
            label: 'Prayer to St. Raphael',
            text: 'St. Raphael the Archangel, I ask you to intercede for me in all my needs and especially for healing of body and soul. Amen.',
          },
          {
            label: 'Salutation to Our Lady',
            text: 'Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'rosary',
    title: 'The Holy Rosary',
    description:
      'Pray the Rosary daily using the Rosary Center PWA. Meditate on the mysteries of the faith with guided prayers.',
    type: 'external',
    externalUrl: 'https://www.rosarycenter.org/pwa',
    sections: [],
  },
  {
    id: 'auxilium-christianorum',
    title: 'Auxilium Christianorum',
    description:
      'A powerful prayer of deliverance and protection. Use the Auxilium Christianorum app to pray along.',
    type: 'external',
    externalUrl: 'https://apps.apple.com/us/app/auxilium-christianorum/id1422439529',
    sections: [],
  },
];

export function getPrayerById(id: string): Prayer | undefined {
  return prayers.find((p) => p.id === id);
}
