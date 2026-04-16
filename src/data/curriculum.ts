import { DayLesson } from '../types';

export const CURRICULUM: DayLesson[] = [
  {
    day: 1,
    title: "The Basics: Greetings",
    category: 'Greetings & Introductions',
    vocabulary: [
      { id: '1-1', spanish: 'Hola', english: 'Hello', exampleSpanish: 'Hola, ¿cómo estás?', exampleEnglish: 'Hello, how are you?' },
      { id: '1-2', spanish: 'Buenos días', english: 'Good morning', exampleSpanish: 'Buenos días, señor.', exampleEnglish: 'Good morning, sir.' },
      { id: '1-3', spanish: 'Buenas tardes', english: 'Good afternoon', exampleSpanish: 'Buenas tardes a todos.', exampleEnglish: 'Good afternoon to everyone.' },
      { id: '1-4', spanish: 'Buenas noches', english: 'Good night / evening', exampleSpanish: 'Buenas noches, mamá.', exampleEnglish: 'Good night, mom.' },
      { id: '1-5', spanish: 'Adiós', english: 'Goodbye', exampleSpanish: 'Adiós, hasta mañana.', exampleEnglish: 'Goodbye, see you tomorrow.' },
    ],
    phrases: [
      { id: '1-p1', spanish: 'Mucho gusto', english: 'Nice to meet you' },
      { id: '1-p2', spanish: '¿Cómo te llamas?', english: 'What is your name?' },
      { id: '1-p3', spanish: 'Me llamo...', english: 'My name is...' },
    ],
    quiz: [
      { id: 'q1-1', question: 'How do you say "Good morning" in Spanish?', options: ['Buenas noches', 'Buenos días', 'Hola', 'Adiós'], correctAnswer: 'Buenos días', type: 'multiple-choice' },
      { id: 'q1-2', question: 'Match the English with Spanish Greeting:', options: ['Hello:Hola', 'Good morning:Buenos días', 'Goodbye:Adiós'], correctAnswer: 'Hello:Hola', type: 'match' },
      { id: 'q1-3', question: 'Fill in the blank: "Mucho ____" (Nice to meet you)', options: ['Gusto', 'Gracias', 'Nada'], correctAnswer: 'Gusto', type: 'fill-blank' },
    ]
  },
  {
    day: 2,
    title: "Saying How You Are",
    category: 'Greetings & Introductions',
    vocabulary: [
      { id: '2-1', spanish: 'Bien', english: 'Well / Good', exampleSpanish: 'Estoy muy bien, gracias.', exampleEnglish: 'I am very well, thank you.' },
      { id: '2-2', spanish: 'Mal', english: 'Bad', exampleSpanish: 'Hoy me siento mal.', exampleEnglish: 'I feel bad today.' },
      { id: '2-3', spanish: 'Así así', english: 'So-so', exampleSpanish: 'Estoy así así hoy.', exampleEnglish: 'I am so-so today.' },
      { id: '2-4', spanish: 'Cansado', english: 'Tired', exampleSpanish: 'Estoy muy cansado.', exampleEnglish: 'I am very tired.' },
      { id: '2-5', spanish: 'Feliz', english: 'Happy', exampleSpanish: 'Ella está muy feliz.', exampleEnglish: 'She is very happy.' },
    ],
    phrases: [
      { id: '2-p1', spanish: '¿Qué tal?', english: "What's up?" },
      { id: '2-p2', spanish: '¿Y tú?', english: 'And you?' },
      { id: '2-p3', spanish: 'Todo bien', english: 'Everything is fine' },
    ],
    quiz: [
      { id: 'q2-1', question: 'Translate: "I am happy"', options: ['Estoy triste', 'Estoy feliz', 'Estoy cansado', 'Estoy mal'], correctAnswer: 'Estoy feliz', type: 'multiple-choice' },
    ]
  },
  {
    day: 3,
    title: "Family Members",
    category: 'Family & People',
    vocabulary: [
      { id: '3-1', spanish: 'Padre', english: 'Father', exampleSpanish: 'Mi padre es alto.', exampleEnglish: 'My father is tall.' },
      { id: '3-2', spanish: 'Madre', english: 'Mother', exampleSpanish: 'Mi madre es doctora.', exampleEnglish: 'My mother is a doctor.' },
      { id: '3-3', spanish: 'Hermano', english: 'Brother', exampleSpanish: 'Tengo un hermano.', exampleEnglish: 'I have a brother.' },
      { id: '3-4', spanish: 'Hermana', english: 'Sister', exampleSpanish: 'Mi hermana es inteligente.', exampleEnglish: 'My sister is smart.' },
      { id: '3-5', spanish: 'Hijo', english: 'Son', exampleSpanish: 'Él es mi único hijo.', exampleEnglish: 'He is my only son.' },
    ],
    phrases: [
      { id: '3-p1', spanish: 'Esta es mi familia', english: 'This is my family' },
      { id: '3-p2', spanish: 'Tengo dos hermanos', english: 'I have two brothers' },
    ],
    quiz: [
      { id: 'q3-1', question: 'How do you say "Sister"?', options: ['Hermano', 'Hermana', 'Madre', 'Hija'], correctAnswer: 'Hermana', type: 'multiple-choice' },
    ]
  },
  {
    day: 4,
    title: "Extended Family",
    category: 'Family & People',
    vocabulary: [
      { id: '4-1', spanish: 'Abuelo', english: 'Grandfather', exampleSpanish: 'Mi abuelo vive en Madrid.', exampleEnglish: 'My grandfather lives in Madrid.' },
      { id: '4-2', spanish: 'Abuela', english: 'Grandmother', exampleSpanish: 'Mi abuela cocina muy bien.', exampleEnglish: 'My grandmother cooks very well.' },
      { id: '4-3', spanish: 'Tío', english: 'Uncle', exampleSpanish: 'Mi tío es divertido.', exampleEnglish: 'My uncle is funny.' },
      { id: '4-4', spanish: 'Tía', english: 'Aunt', exampleSpanish: 'Mi tía es profesora.', exampleEnglish: 'My aunt is a teacher.' },
      { id: '4-5', spanish: 'Primo', english: 'Cousin (male)', exampleSpanish: 'Mi primo juega fútbol.', exampleEnglish: 'My cousin plays soccer.' },
    ],
    phrases: [
      { id: '4-p1', spanish: '¡Felicidades!', english: 'Congratulations!' },
      { id: '4-p2', spanish: 'Que te diviertas', english: 'Have fun' },
    ],
    quiz: [
      { id: 'q4-1', question: 'Translate: "My grandfather"', options: ['Mi padre', 'Mi abuelo', 'Mi tío', 'Mi primo'], correctAnswer: 'Mi abuelo', type: 'multiple-choice' },
    ]
  },
  {
    day: 5,
    title: "Daily Activities",
    category: 'Daily Life',
    vocabulary: [
      { id: '5-1', spanish: 'Comer', english: 'To eat', exampleSpanish: 'Me gusta comer pizza.', exampleEnglish: 'I like to eat pizza.' },
      { id: '5-2', spanish: 'Beber', english: 'To drink', exampleSpanish: 'Quiero beber agua.', exampleEnglish: 'I want to drink water.' },
      { id: '5-3', spanish: 'Dormir', english: 'To sleep', exampleSpanish: 'Necesito dormir ocho horas.', exampleEnglish: 'I need to sleep eight hours.' },
      { id: '5-4', spanish: 'Trabajar', english: 'To work', exampleSpanish: 'Trabajo en una oficina.', exampleEnglish: 'I work in an office.' },
      { id: '5-5', spanish: 'Estudiar', english: 'To study', exampleSpanish: 'Estudio español todos los días.', exampleEnglish: 'I study Spanish every day.' },
    ],
    phrases: [
      { id: '5-p1', spanish: 'Tengo hambre', english: 'I am hungry' },
      { id: '5-p2', spanish: 'Tengo sed', english: 'I am thirsty' },
    ],
    quiz: [
      { id: 'q5-1', question: 'What does "Dormir" mean?', options: ['To eat', 'To sleep', 'To work', 'To study'], correctAnswer: 'To sleep', type: 'multiple-choice' },
    ]
  },
  {
    day: 6,
    title: "Numbers 1-10",
    category: 'Daily Life',
    vocabulary: [
      { id: '6-1', spanish: 'Uno, Dos, Tres', english: 'One, Two, Three', exampleSpanish: 'Uno, dos, tres, ¡ya!', exampleEnglish: 'One, two, three, go!' },
      { id: '6-2', spanish: 'Cuatro, Cinco, Seis', english: 'Four, Five, Six', exampleSpanish: 'Tengo cinco gatos.', exampleEnglish: 'I have five cats.' },
      { id: '6-3', spanish: 'Siete, Ocho, Nueve', english: 'Seven, Eight, Nine', exampleSpanish: 'Son las ocho en punto.', exampleEnglish: "It's eight o'clock." },
      { id: '6-4', spanish: 'Diez', english: 'Ten', exampleSpanish: 'Tengo diez dedos.', exampleEnglish: 'I have ten fingers.' },
      { id: '6-5', spanish: 'Cero', english: 'Zero', exampleSpanish: 'El número es cero.', exampleEnglish: 'The number is zero.' },
    ],
    phrases: [
      { id: '6-p1', spanish: '¿Cuántos años tienes?', english: 'How old are you?' },
      { id: '6-p2', spanish: 'Tengo veinte años', english: 'I am twenty years old' },
    ],
    quiz: [
      { id: 'q6-1', question: 'How do you say "Five" in Spanish?', options: ['Cuatro', 'Cinco', 'Seis', 'Siete'], correctAnswer: 'Cinco', type: 'multiple-choice' },
    ]
  },
  {
    day: 7,
    title: "At the Restaurant",
    category: 'Food & Dining',
    vocabulary: [
      { id: '7-1', spanish: 'La cuenta', english: 'The bill', exampleSpanish: 'La cuenta, por favor.', exampleEnglish: 'The bill, please.' },
      { id: '7-2', spanish: 'El menú', english: 'The menu', exampleSpanish: '¿Puedo ver el menú?', exampleEnglish: 'Can I see the menu?' },
      { id: '7-3', spanish: 'Camarero', english: 'Waiter', exampleSpanish: 'El camarero es muy amable.', exampleEnglish: 'The waiter is very kind.' },
      { id: '7-4', spanish: 'Desayuno', english: 'Breakfast', exampleSpanish: 'El desayuno es importante.', exampleEnglish: 'Breakfast is important.' },
      { id: '7-5', spanish: 'Cena', english: 'Dinner', exampleSpanish: '¿A qué hora es la cena?', exampleEnglish: 'What time is dinner?' },
    ],
    phrases: [
      { id: '7-p1', spanish: 'Una mesa para dos', english: 'A table for two' },
      { id: '7-p2', spanish: '¡Buen provecho!', english: 'Enjoy your meal!' },
    ],
    quiz: [
      { id: 'q7-1', question: 'What do you say to ask for the bill?', options: ['El menú, por favor', 'La cuenta, por favor', 'Hola', 'Gracias'], correctAnswer: 'La cuenta, por favor', type: 'multiple-choice' },
    ]
  },
  // Adding placeholders for Day 8-100 to show structure
  ...Array.from({ length: 93 }, (_, i) => ({
    day: i + 8,
    title: `Lesson ${i + 8}: Expanding Your Skills`,
    category: (i < 2 ? 'Food & Dining' : i < 7 ? 'Travel & Transport' : i < 12 ? 'Work & School' : 'Common Verbs') as any,
    vocabulary: [
      { id: `${i + 8}-1`, spanish: 'Palabra', english: 'Word', exampleSpanish: 'Ejemplo de palabra.', exampleEnglish: 'Word example.' },
    ],
    phrases: [{ id: `${i + 8}-p1`, spanish: 'Frase común', english: 'Common phrase' }],
    quiz: [{ id: `q${i + 8}-1`, question: 'Simple question?', options: ['A', 'B', 'C'], correctAnswer: 'A', type: 'multiple-choice' as const }]
  }))
];
