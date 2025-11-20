# Правила написания React компонентов

## Общие принципы

### Стрелочные функции

- Все компоненты пишем через `export const Component: FC<Props>`
- Используем именованный экспорт с типом `FC`
- Импортируем `FC` из React для типизации

### Базовая структура компонента

```typescript
import { FC, ReactNode, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@components/UI'
import styles from './ComponentName.module.scss'

type ComponentNameProps = {
  title: string
  children?: ReactNode
  onClick?: () => void
}

export const ComponentName: FC<ComponentNameProps> = ({ title, children, onClick }) => {
  // Хуки всегда в начале
  const [isVisible, setIsVisible] = useState(false)

  // Обработчики событий
  const handleClick = () => {
    onClick?.()
    setIsVisible(!isVisible)
  }

  // Вычисляемые значения с clsx
  const containerClass = clsx(styles.container, {
    [styles.visible]: isVisible
  })

  return (
    <div className={containerClass}>
      <h2 className={styles.title}>{title}</h2>
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
      <Button variant="secondary" onClick={handleClick}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </Button>
    </div>
  )
}
```

## Типизация компонентов

### Props типы

```typescript
// Простые пропсы
type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

// Расширенные пропсы с дженериками
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
};

// Пропсы с HTML атрибутами
type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
```

### Использование children

```typescript
// Обязательные children
type CardProps = {
  title: string;
  children: React.ReactNode;
};

// Опциональные children
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

// Типизированные children
type TabsProps = {
  children: React.ReactElement<TabProps>[];
};
```

## Хуки и состояние

### Порядок хуков

```typescript
import { FC, useState, useEffect } from 'react'
import { useApiData } from '@/hooks'

type ComponentProps = {
  initialValue: string
}

export const Component: FC<ComponentProps> = ({ initialValue }) => {
  // 1. useState
  const [value, setValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)

  // 2. useEffect
  useEffect(() => {
    // side effects
  }, [])

  // 3. Кастомные хуки
  const { data, error } = useApiData()

  // 4. Обработчики событий
  const handleSubmit = () => {
    // logic
  }

  // 5. Вычисляемые значения
  const isValid = value.length > 0

  return (
    // JSX
  )
}
```

### Кастомные хуки

```typescript
// hooks/useCounter.ts
import { useCallback, useState } from 'react';

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};
```

## Условный рендеринг

### Лучшие практики

```typescript
import { FC } from 'react'
import { ErrorMessage, LoadingSpinner, EmptyState, ItemCard } from '@components/UI'
import styles from './Component.module.scss'

type ComponentProps = {
  items: Item[]
  isLoading: boolean
  error?: string
}

export const Component: FC<ComponentProps> = ({ items, isLoading, error }) => {
  // Ранний возврат для ошибок
  if (error) {
    return <ErrorMessage error={error} />
  }

  // Ранний возврат для загрузки
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Ранний возврат для пустого состояния
  if (!items.length) {
    return <EmptyState />
  }

  return (
    <div className={styles.container}>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### Условные классы

```typescript
import { FC } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

type ButtonProps = {
  variant: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
  isActive?: boolean
}

export const Button: FC<ButtonProps> = ({ variant, size, disabled, isActive }) => {
  // С clsx (рекомендуемый подход)
  const buttonClass = clsx(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles.active]: isActive
    }
  )

  return <button className={buttonClass}>...</button>
}
```

## Оптимизация производительности

### React.memo

```typescript
type ExpensiveComponentProps = {
  data: ComplexData
  onUpdate: (data: ComplexData) => void
}

const ExpensiveComponent = React.memo(({ data, onUpdate }: ExpensiveComponentProps) => {
  return (
    // Expensive rendering logic
  )
})

export default ExpensiveComponent
```

### useCallback и useMemo

```typescript
const Component = ({ items, filter }: Props) => {
  // Мемоизация вычислений
  const filteredItems = React.useMemo(() => {
    return items.filter(item => item.name.includes(filter))
  }, [items, filter])

  // Мемоизация функций
  const handleItemClick = React.useCallback((item: Item) => {
    // handle click
  }, [])

  return (
    <div>
      {filteredItems.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  )
}
```

## Анимации с Framer Motion

Framer Motion — лёгкая и мощная библиотека, созданная специально для React и подходящая для Next.js.

Framer Motion используется для:

- ✅ Плавных переходов и анимаций
- ✅ Анимации появления/исчезновения элементов
- ✅ Интерактивных анимаций (hover, tap, drag)
- ✅ Сложных анимаций с spring-физикой
- ✅ Анимации списков (stagger)
- ✅ Анимации маршрутов (page transitions)

**⚠️ Важно:** Framer Motion работает только в **Client Components**. Добавляйте `'use client'` директиву в начало файла.

### Базовое использование

```typescript
'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import styles from './Component.module.scss'

type ComponentProps = {
  title: string
}

export const Component: FC<ComponentProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <h1>{title}</h1>
    </motion.div>
  )
}
```

### Интерактивные анимации

```typescript
'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import styles from './Button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}
```

### Анимация при скролле (scroll animations)

```typescript
'use client'

import { FC } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './ScrollSection.module.scss'

type ScrollSectionProps = {
  children: React.ReactNode
}

export const ScrollSection: FC<ScrollSectionProps> = ({ children }) => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div
      className={styles.section}
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  )
}
```

### Правила производительности

1. **Используйте `will-change` для сложных анимаций:**

   ```typescript
   <motion.div
     style={{ willChange: 'transform' }}
     animate={{ x: 100 }}
   >
     Content
   </motion.div>
   ```

2. **Ограничивайте количество анимируемых свойств:**

   ```typescript

   <motion.div
     animate={{ x: 100, opacity: 1 }}
   />
   ```

3. **Используйте `layout` для автоматических анимаций layout:**

   ```typescript
   <motion.div layout>
     {/* Анимация автоматически при изменении layout */}
   </motion.div>
   ```

4. **Избегайте анимации `width` и `height` - используйте `scale`:**

   ```typescript

   <motion.div animate={{ scaleX: 1.5 }} />
   ```

### AnimatePresence

`AnimatePresence` позволяет анимировать элементы при их монтировании и размонтировании из DOM. Это особенно полезно для модальных окон, уведомлений, списков и условного рендеринга.

#### Режимы AnimatePresence

`AnimatePresence` поддерживает несколько режимов для управления анимацией при изменении списка:

- **`mode="wait"`** - ждет завершения exit анимации перед началом enter
- **`mode="sync"`** - анимации выполняются одновременно (по умолчанию)
- **`mode="popLayout"`** - автоматически анимирует layout при удалении элементов

**Пример 1: `mode="wait"` (для табов и переключения контента)**

```typescript
<AnimatePresence mode="wait">
  {activeTab === 'tab1' && (
    <motion.div
      key="tab1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      Content Tab 1
    </motion.div>
  )}
  {activeTab === 'tab2' && (
    <motion.div
      key="tab2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      Content Tab 2
    </motion.div>
  )}
</AnimatePresence>
```

**Пример 2: `mode="sync"` (по умолчанию, для списков)**

```typescript
<AnimatePresence mode="sync">
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {item.text}
    </motion.div>
  ))}
</AnimatePresence>
```

**Пример 3: `mode="popLayout"` (для списков с автоматической анимацией layout)**

```typescript
<AnimatePresence mode="popLayout">
  {items.map((item) => (
    <motion.li
      key={item.id}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {item.text}
    </motion.li>
  ))}
</AnimatePresence>
```

#### Важные правила для AnimatePresence

1. **Всегда используйте `key` для элементов в списке:**

   ```typescript
   {items.map((item) => (
     <motion.div key={item.id}>...</motion.div>
   ))}
   ```

2. **Указывайте `exit` анимацию:**

   ```typescript
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
   />
   ```

3. **Используйте `mode` для контроля последовательности:**

   ```typescript
   // Для табов и переключения контента
   <AnimatePresence mode="wait">
   ```

4. **Используйте AnimatePresence для условно рендерящихся элементов:**

   ```typescript

   <AnimatePresence>
     {isVisible && (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
       >
         Content
       </motion.div>
     )}
   </AnimatePresence>
   ```
