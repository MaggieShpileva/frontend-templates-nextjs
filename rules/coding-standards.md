# Стандарты кодирования

## TypeScript/React

### Общие правила

- Используйте TypeScript для всех файлов
- Используйте только функциональные компоненты (стрелочные функции)
- Используйте хуки для управления состоянием
- Все компоненты пишем через `export const Component: FC<Props>`
- Импортируйте `FC` из React для типизации компонентов
- В приоритете — серверные компоненты (Server Components)
- Клиентские компоненты используйте только при необходимости: если нужны состояние, эффекты или обработчики событий

### Типы TypeScript

- Используйте только `type` для определения типов (не используйте `interface`)
- Именованные типы: PascalCase с суффиксом (например, `ButtonProps`, `UserData`, `ApiResponse`)

**Пример:**

```typescript
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};
```

### Именование

- **Компоненты**: PascalCase (например, `UserProfile`)
- **Переменные и функции**: camelCase (например, `getUserData`)
- **Константы**: UPPER_SNAKE_CASE (например, `API_BASE_URL`)
- **Файлы компонентов**: PascalCase.tsx (например, `UserProfile.tsx`)

### Структура файлов

- Каждый компонент в отдельном файле
- Именованный экспорт для компонентов (`export const Component`)
- Экспорт компонента через `index.ts` для удобного импорта
- Именованный экспорт для утилит и хуков

### Структура компонента

```
src/components/Button/
├── index.ts              # Реэкспорт компонента
├── Button.tsx            # Основной компонент (именованный экспорт)
└── Button.module.scss    # Стили компонента
```

**Пример:**

```typescript
// Button.tsx
export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

// index.ts
export { Button } from './Button';
```

### Использование clsx

- ✅ Условные классы с объектным синтаксисом
- ✅ Автоматическое удаление falsy значений
- ✅ Поддержка массивов и строк

### Именование классов

- Используйте camelCase для всех классов: `.buttonPrimary`, `.cardHeader`
- **Базовые элементы**: `.button`, `.card`, `.input`
- **Модификаторы**: `.buttonPrimary`, `.buttonSecondary`, `.inputLarge`
- **Составные элементы**: `.cardHeader`, `.modalContent`, `.navbarItem`

### SCSS правила

- Максимальная вложенность: 3 уровня
- Используйте переменные для цветов, размеров, шрифтов
- Группируйте свойства логически
- Используйте миксины для повторяющихся паттернов
- **CSS модули**: всегда используйте `.module.scss` для компонентов
- **Глобальные стили**: только в `src/styles/` папке

### Примеры именования классов

```scss
.buttonPrimary {
  // стили
}

.cardHeader {
  // стили
}

.navbarItem {
  // стили
}
```

## Комментарии

### Когда комментировать

- Сложная бизнес-логика
- Неочевидные решения
- TODO и FIXME заметки
- JSDoc для публичных API

### Формат комментариев

```typescript
/**
 * Описание функции
 * @param param1 - описание параметра
 * @returns описание возвращаемого значения
 */
```

## Статические файлы

### Хранение и использование изображений

- Все статические изображения храните в папке `/public/`
- SEO-картинки (Open Graph, Twitter Cards) храните в `/public/og/`
- Изображения доступны по пути от корня: `/image.png` → `/public/image.png`

**Особенности `/public/` в Next.js:**

- Файлы автоматически обслуживаются как статические ресурсы
- Доступны по прямому URL без обработки бандлером
- Оптимизируются Next.js Image Optimization API
- Кешируются браузером и CDN
- Подходят для SEO-метаданных и социальных сетей

### SVG-картинки

Проект использует `@svgr/webpack` для импорта SVG как React-компонентов.

- **Импорт SVG как компонентов**: импортируйте SVG файлы напрямую — они автоматически преобразуются в React-компоненты
- **Статические SVG**: для SEO-картинок и файлов, которые не нужно стилизовать, используйте `/public/`

### Именование при импорте

При импорте изображений используйте префиксы для указания типа файла:

- **SVG**: `SVG_nameIcon` (например, `SVG_logoIcon`, `SVG_closeIcon`)
- **PNG**: `PNG_pngName` (например, `PNG_backgroundImage`, `PNG_heroBanner`)
- **JPG/JPEG**: `JPG_jpgName` (например, `JPG_photoImage`)
- **WEBP**: `WEBP_webpName` (например, `WEBP_optimizedImage`)

**Пример использования:**

```typescript
import SVG_logoIcon from '@public/icons/logo.svg';
import PNG_backgroundImage from '@public/images/background.png';
import JPG_heroPhoto from '@public/images/hero.jpg';
import Image from 'next/image';

// Векторное изображение как компонент
<SVG_logoIcon className="logo" />

// Растровое изображение через путь
<Image src="/images/hero.jpg" alt="Background" />

// Растровое изображение через импорт
<Image src={JPG_heroPhoto} alt="Background" />
```

### Когда использовать импорт SVG

- Нужно изменять цвет через CSS (`className`, `style`)
- Требуются анимации или интерактивность
- Нужна кастомизация через пропсы
- Важна оптимизация бандла (tree-shaking)
