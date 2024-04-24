# Тестове завдання: Погодний додаток

**Це простий погодний додаток, який дозволяє додавати та переглядати інформацію про погоду для різних міст.**

## Огляд

- **Додавання міста**: Додавання нового міста за назвою.
- **Відображення погоди**: Відображення погодних даних для вибраного міста.
- **Прогноз на годину**: Перегляд погодних прогнозів на годину вперед.

## Технології

- **React**: Основна бібліотека для створення користувацького інтерфейсу.
- **Redux**: Управління станом додатку.
- **Axios**: HTTP-запити.
- **Recharts**: Візуалізація графіків.

## Структура проекту

```plaintext
src/
├── components/
│   ├── CityCard/
│   │   └── CityCard.tsx
│   │   └── index.js
│   └── Header/
│       └── Header.tsx
│       └── index.js
├── pages/
│   ├── CityDetailPage/
│   │   └── CityDetailPage.tsx
│   │   └── index.js
│   └── HomePage/
│       └── HomePage.tsx
│       └── index.js
├── redux/
│   ├── citySlice.ts
│   └── store.ts
├── services/
│   └── weatherService.ts
├── types/
│   └── types.ts
├── App.tsx
├── index.tsx
package.json
README.md
```

## Примітки

- Використовується публічний API погоди з [OpenWeather](https://openweathermap.org/).
- Обрані міста зберігаються в `localStorage`.
