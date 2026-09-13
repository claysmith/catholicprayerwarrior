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
  trackingType?: 'daily' | 'count';
}

export const prayers: Prayer[] = [
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
    id: 'angelus',
    title: 'The Angelus',
    description:
      'Commemorating the Incarnation. Traditionally prayed at 6am, noon, and 6pm. Track each time you pray it.',
    type: 'internal',
    trackingType: 'count',
    sections: [
      {
        title: 'The Angelus',
        steps: [
          {
            label: 'V. The Angel of the Lord declared unto Mary.',
            text: 'R. And she conceived of the Holy Spirit.\n\nHail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'V. Behold the handmaid of the Lord.',
            text: 'R. Be it done unto me according to Thy word.\n\nHail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'V. And the Word was made flesh.',
            text: 'R. And dwelt among us.\n\nHail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
          {
            label: 'V. Pray for us, O Holy Mother of God.',
            text: 'R. That we may be made worthy of the promises of Christ.',
          },
          {
            label: 'Let Us Pray',
            text: 'Pour forth, we beseech Thee, O Lord, Thy grace into our hearts, that we, to whom the Incarnation of Christ Thy Son was made known by the message of an angel, may by His Passion and Cross be brought to the glory of His Resurrection, through the same Christ Our Lord. Amen.',
          },
          {
            label: 'Glory Be (3 times)',
            text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
          },
        ],
      },
    ],
  },
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
            label: 'St. Faustina\'s Prayer for Sinners',
            text: 'O Jesus, eternal Truth, our Life, I call upon You and I beg Your mercy for poor sinners. O sweetest Heart of my Lord, full of pity and unfathomable mercy, I plead with You for poor sinners. O Most Sacred Heart, Fount of Mercy from which gush forth rays of inconceivable graces upon the entire human race, I beg of You light for poor sinners. O Jesus, be mindful of Your own bitter Passion and do not permit the loss of souls redeemed at so dear a price of Your most precious Blood. O Jesus, when I consider the great price of Your Blood, I rejoice at its immensity, for one drop alone would have been enough for the salvation of all sinners. Although sin is an abyss of wickedness and ingratitude, the price paid for us can never be equalled. Therefore, let every soul trust in the Passion of the Lord, and place its hope in His mercy. God will not deny His mercy to anyone. Heaven and earth may change, but God\'s mercy will never be exhausted. Oh, what immense joy burns in my heart when I contemplate Your incomprehensible goodness, O Jesus! I desire to bring all sinners to Your feet that they may glorify Your mercy throughout endless ages (Diary of Saint Maria Faustina Kowalska, 72).',
          },
          {
            label: 'You Expired, Jesus',
            text: 'You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us.',
          },
          {
            label: 'O Blood and Water (3 times)',
            text: 'O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You!',
          },
        ],
      },
      {
        title: 'Introductory Prayers',
        steps: [
          {
            label: 'Our Father',
            text: 'Our Father, Who art in Heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in Heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.',
          },
          {
            label: 'Hail Mary',
            text: 'Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.',
          },
          {
            label: 'The Apostles\' Creed',
            text: 'I believe in God, the Father almighty, Creator of Heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into Heaven, and is seated at the right hand of God the Father almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the Communion of Saints, the forgiveness of sins, the Resurrection of the body, and life everlasting. Amen.',
          },
        ],
      },
      {
        title: 'First Decade',
        steps: [
          {
            label: 'The Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'For the Sake of His Sorrowful Passion (10 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Second Decade',
        steps: [
          {
            label: 'The Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'For the Sake of His Sorrowful Passion (10 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Third Decade',
        steps: [
          {
            label: 'The Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'For the Sake of His Sorrowful Passion (10 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Fourth Decade',
        steps: [
          {
            label: 'The Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'For the Sake of His Sorrowful Passion (10 times)',
            text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
          },
        ],
      },
      {
        title: 'Fifth Decade',
        steps: [
          {
            label: 'The Eternal Father',
            text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world.',
          },
          {
            label: 'For the Sake of His Sorrowful Passion (10 times)',
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
            label: 'Eternal God, in Whom Mercy is Endless',
            text: 'Eternal God, in Whom mercy is endless and the treasury of compassion — inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy itself.',
          },
          {
            label: 'O Greatly Merciful God',
            text: 'O Greatly Merciful God, Infinite Goodness, today all mankind calls out from the abyss of its misery to Your mercy — to Your compassion, O God; and it is with its mighty voice of misery that it cries out. Gracious God, do not reject the prayer of this earth\'s exiles! O Lord, Goodness beyond our understanding, Who are acquainted with our misery through and through, and know that by our own power we cannot ascend to You, we implore You: anticipate us with Your grace and keep on increasing Your mercy in us, that we may faithfully do Your holy will all through our life and at death\'s hour. Let the omnipotence of Your mercy shield us from the darts of our salvation\'s enemies, that we may with confidence, as Your children, await Your [Son\'s] final coming — that day known to You alone. And we expect to obtain everything promised us by Jesus in spite of all our wretchedness. For Jesus is our Hope: through His merciful Heart, as through an open gate, we pass through to Heaven (Diary, 1570).',
          },
        ],
      },
    ],
  },
  {
    id: 'st-michael',
    title: 'The Chaplet of St. Michael',
    description:
      'A chaplet of prayers honoring the nine choirs of angels, revealed to the Portuguese Carmelite nun Antónia d\'Astónaco in 1750 and approved by Pope Pius IX in 1851.',
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
            label: 'Prayer to the Seraphim',
            text: 'By the intercession of St. Michael and the celestial Choir of Seraphim may the Lord make us worthy to burn with the fire of perfect charity. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Second Salutation — To the Cherubim',
        steps: [
          {
            label: 'Prayer to the Cherubim',
            text: 'By the intercession of St. Michael and the celestial Choir of Cherubim may the Lord grant us the grace to leave the ways of sin and run in the paths of Christian perfection. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Third Salutation — To the Thrones',
        steps: [
          {
            label: 'Prayer to the Thrones',
            text: 'By the intercession of St. Michael and the celestial Choir of Thrones may the Lord infuse into our hearts a true and sincere spirit of humility. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Fourth Salutation — To the Dominations',
        steps: [
          {
            label: 'Prayer to the Dominations',
            text: 'By the intercession of St. Michael and the celestial Choir of Dominations may the Lord give us grace to govern our senses and overcome any unruly passions. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Fifth Salutation — To the Virtues',
        steps: [
          {
            label: 'Prayer to the Virtues',
            text: 'By the intercession of St. Michael and the celestial Choir of Virtues may the Lord preserve us from evil and falling into temptation. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Sixth Salutation — To the Powers',
        steps: [
          {
            label: 'Prayer to the Powers',
            text: 'By the intercession of St. Michael and the celestial Choir of Powers may the Lord protect our souls against the snares and temptations of the devil. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Seventh Salutation — To the Principalities',
        steps: [
          {
            label: 'Prayer to the Principalities',
            text: 'By the intercession of St. Michael and the celestial Choir of Principalities may God fill our souls with a true spirit of obedience. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Eighth Salutation — To the Archangels',
        steps: [
          {
            label: 'Prayer to the Archangels',
            text: 'By the intercession of St. Michael and the celestial Choir of Archangels may the Lord give us perseverance in faith and in all good works in order that we may attain the glory of Heaven. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'Ninth Salutation — To the Angels',
        steps: [
          {
            label: 'Prayer to the Angels',
            text: 'By the intercession of St. Michael and the celestial Choir of Angels may the Lord grant us to be protected by them in this mortal life and conducted in the life to come to Heaven. Amen.',
          },
          {
            label: 'Our Father',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Hail Mary (3 times)',
            text: 'Hail Mary, full of grace! The Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
          },
        ],
      },
      {
        title: 'In Honor of the Leading Angels',
        steps: [
          {
            label: 'Our Father — In Honor of St. Michael',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Our Father — In Honor of St. Gabriel',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Our Father — In Honor of St. Raphael',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
          {
            label: 'Our Father — In Honor of Our Guardian Angel',
            text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
          },
        ],
      },
      {
        title: 'Concluding Prayers',
        steps: [
          {
            label: 'O Glorious Prince St. Michael',
            text: 'O glorious prince St. Michael, chief and commander of the heavenly hosts, guardian of souls, vanquisher of rebel spirits, servant in the house of the Divine King and our admirable conductor, you who shine with excellence and superhuman virtue deliver us from all evil, who turn to you with confidence and enable us by your gracious protection to serve God more and more faithfully every day.',
          },
          {
            label: 'Pray for Us, O Glorious St. Michael',
            text: 'Pray for us, O glorious St. Michael, Prince of the Church of Jesus Christ, that we may be made worthy of His promises.',
          },
          {
            label: 'Almighty and Everlasting God',
            text: 'Almighty and Everlasting God, Who, by a prodigy of goodness and a merciful desire for the salvation of all men, has appointed the most glorious Archangel St. Michael Prince of Your Church, make us worthy, we ask You, to be delivered from all our enemies, that none of them may harass us at the hour of death, but that we may be conducted by him into Your Presence. This we ask through the merits of Jesus Christ Our Lord. Amen.',
          },
        ],
      },
    ],
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
  {
    id: 'st-michael-short',
    title: 'Prayer to St. Michael (Short)',
    description:
      'The short prayer to St. Michael the Archangel for protection, composed by Pope Leo XIII.',
    type: 'internal',
    sections: [
      {
        title: 'Prayer to St. Michael',
        steps: [
          {
            label: 'Prayer',
            text: 'St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'memorare',
    title: 'The Memorare',
    description:
      'A beloved prayer to the Blessed Virgin Mary, attributed to St. Bernard of Clairvaux.',
    type: 'internal',
    sections: [
      {
        title: 'The Memorare',
        steps: [
          {
            label: 'Prayer',
            text: 'Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother. To thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'anima-christi',
    title: 'Anima Christi (Soul of Christ)',
    description:
      'A profound Eucharistic prayer dating to the 14th century, often prayed after Communion.',
    type: 'internal',
    sections: [
      {
        title: 'Anima Christi',
        steps: [
          {
            label: 'Prayer',
            text: 'Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me. Passion of Christ, strengthen me. O Good Jesus, hear me. Within Thy wounds hide me. Permit me not to be separated from Thee. From the wicked foe defend me. At the hour of my death call me, and bid me come to Thee, that with Thy saints I may praise Thee, forever and ever. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'act-of-contrition',
    title: 'Act of Contrition',
    description:
      'A prayer expressing sorrow for sin, traditionally prayed during the Sacrament of Penance.',
    type: 'internal',
    sections: [
      {
        title: 'Act of Contrition',
        steps: [
          {
            label: 'Prayer',
            text: 'O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasion of sin. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'morning-offering',
    title: 'Morning Offering',
    description:
      'Consecrate each day to the Sacred Heart of Jesus through the intercession of Mary.',
    type: 'internal',
    sections: [
      {
        title: 'Morning Offering',
        steps: [
          {
            label: 'Prayer',
            text: 'O Jesus, through the Immaculate Heart of Mary, I offer Thee my prayers, works, joys, and sufferings of this day, in union with the Holy Sacrifice of the Mass throughout the world. I offer them for all the intentions of Thy Sacred Heart: the salvation of souls, reparation for sin, and the reunion of all Christians. I offer them for the intentions of our bishops and of all Apostles of Prayer, and in particular for those recommended by our Holy Father this month. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'st-joseph',
    title: 'Prayer to St. Joseph',
    description:
      'A prayer to St. Joseph, the foster father of Jesus and patron of the Universal Church.',
    type: 'internal',
    sections: [
      {
        title: 'Prayer to St. Joseph',
        steps: [
          {
            label: 'Prayer',
            text: 'O St. Joseph, whose protection is so great, so strong, so prompt before the throne of God, I place in thee all my interests and desires. O St. Joseph, do assist me by thy powerful intercession, and obtain for me from thy divine Son all spiritual blessings, through Jesus Christ, our Lord. So that, having engaged here below thy heavenly power, I may offer my thanksgiving and homage to the most loving of fathers. O St. Joseph, I never weary contemplating thee, and Jesus asleep in thine arms; I dare not approach while He reposes near thy heart. Press Him in my name and kiss His fine head for me and ask Him to return the kiss when I draw my dying breath. St. Joseph, patron of departing souls, pray for me. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'guardian-angel',
    title: 'Prayer to Your Guardian Angel',
    description:
      'A traditional prayer to your guardian angel for protection and guidance throughout the day.',
    type: 'internal',
    sections: [
      {
        title: 'Prayer to Your Guardian Angel',
        steps: [
          {
            label: 'Prayer',
            text: 'Angel of God, my guardian dear, to whom God\'s love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.',
          },
        ],
      },
    ],
  },
];

export function getPrayerById(id: string): Prayer | undefined {
  return prayers.find((p) => p.id === id);
}
