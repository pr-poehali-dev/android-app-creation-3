# Инструкция по сборке Android-приложения

## Необходимые инструменты

1. **Node.js** (версия 18 или выше)
2. **Android Studio** - [скачать](https://developer.android.com/studio)
3. **Java JDK** (версия 17 или выше)

## Ресурсы приложения

### Иконка и Splash Screen

Для приложения созданы следующие ресурсы:

**Иконка приложения:**
https://cdn.poehali.dev/projects/01378875-58df-418f-af2c-1769c4edcbce/files/69092d63-422d-4a1b-ba69-94552c3f8051.jpg

**Splash Screen (экран загрузки):**
https://cdn.poehali.dev/projects/01378875-58df-418f-af2c-1769c4edcbce/files/24c60edd-5481-4652-8228-de0008cfc8b0.jpg

Сохраните эти изображения и поместите их в следующие папки после создания Android-проекта:
- Иконка: `android/app/src/main/res/mipmap-*` (разные размеры)
- Splash: `android/app/src/main/res/drawable/splash.png`

Для автоматической генерации иконок разных размеров можно использовать:
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- [Capacitor Assets](https://github.com/ionic-team/capacitor-assets)

## Шаги для создания Android-приложения

### 1. Установка зависимостей

Если еще не установлены, выполните:

```bash
npm install
# или
bun install
```

### 2. Сборка веб-версии

```bash
npm run build
# или
bun run build
```

Это создаст папку `dist` с готовым приложением.

### 3. Инициализация Capacitor (только первый раз)

```bash
npx cap add android
```

Эта команда создаст папку `android` с проектом Android Studio.

### 4. Синхронизация кода с Android

После каждого изменения кода выполняйте:

```bash
npm run build
npx cap sync
```

Эта команда:
- Копирует файлы из `dist` в Android-проект
- Обновляет нативные плагины

### 5. Открытие проекта в Android Studio

```bash
npx cap open android
```

Или откройте папку `android` вручную в Android Studio.

### 6. Настройка в Android Studio

1. **Дождитесь завершения Gradle Sync** (первый раз может занять 5-10 минут)
2. **Настройте подпись приложения**:
   - Build → Generate Signed Bundle / APK
   - Создайте новый keystore (сохраните пароль!)
3. **Измените версию и название**:
   - Откройте `android/app/build.gradle`
   - Измените `versionCode` и `versionName`

### 7. Сборка APK для тестирования

В Android Studio:
- Build → Build Bundle(s) / APK(s) → Build APK(s)

Файл появится в `android/app/build/outputs/apk/`

### 8. Сборка AAB для Google Play

В Android Studio:
- Build → Generate Signed Bundle / APK
- Выберите **Android App Bundle**
- Выберите ваш keystore
- Выберите **release**

Файл появится в `android/app/build/outputs/bundle/release/`

### 9. Загрузка в Google Play Console

1. Зайдите в [Google Play Console](https://play.google.com/console)
2. Создайте новое приложение
3. Заполните информацию о приложении:
   - Название: **Ментальное здоровье**
   - Описание
   - Скриншоты (минимум 2)
   - Иконка приложения
   - Категория: Здоровье и фитнес
4. Загрузите AAB файл в раздел "Production" или "Testing"
5. Пройдите проверку контента
6. Отправьте на модерацию

## Важные файлы

- `capacitor.config.ts` - Конфигурация Capacitor
- `android/app/src/main/AndroidManifest.xml` - Манифест Android
- `android/app/build.gradle` - Конфигурация сборки
- `android/app/src/main/res/` - Иконки и ресурсы

## Изменение иконки приложения

1. Создайте иконку 1024x1024 пикселей
2. Используйте [Icon Generator](https://www.appicon.co/) для создания всех размеров
3. Замените файлы в `android/app/src/main/res/mipmap-*/`

## Часто задаваемые вопросы

### Как обновить приложение?

1. Измените код
2. `npm run build`
3. `npx cap sync`
4. Увеличьте `versionCode` в `build.gradle`
5. Соберите новый AAB
6. Загрузите в Google Play Console

### Как протестировать на реальном устройстве?

1. Включите "Режим разработчика" на Android-устройстве
2. Включите "Отладку по USB"
3. Подключите устройство к компьютеру
4. В Android Studio нажмите Run (зеленая кнопка)

### Приложение не запускается

- Проверьте логи в Android Studio (Logcat)
- Убедитесь, что выполнили `npx cap sync`
- Попробуйте Build → Clean Project → Rebuild Project

## Дополнительная информация

- [Документация Capacitor](https://capacitorjs.com/docs)
- [Публикация в Google Play](https://developer.android.com/studio/publish)
- [Требования Google Play](https://support.google.com/googleplay/android-developer/answer/9859152)

## Стоимость публикации

- **Google Play Console** - $25 (единоразовый взнос)
- Приложение может быть бесплатным или платным