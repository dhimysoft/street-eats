# WEB103 Project 1 - *Street Eats*

Submitted by: **Dhimy Jean**

About this web app: **Street Eats is a listicle of iconic street foods from around the world. The home page shows each dish as a card with its city, country, category, price, and spice level. Clicking a dish opens its own page (for example `/foods/griot`) with every detail, including where to try it. The app is built with vanilla HTML, CSS, and JavaScript, served by an Express server, and styled with Picocss.**

Time spent: **X** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view should be a unique endpoint, such as as `localhost:3000/bosses/crystalguardian` and `localhost:3000/mantislords`**
  - [ ] *Note: When showing this feature in the video walkthrough, please show the unique URL for each detailed view. We will not be able to give points if we cannot see the implementation* 
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items

The following **additional** features are implemented:

- [x] Live search bar that filters dishes by name, country, city, or category as you type
- [x] Cards fade in on load and lift on hover
- [x] The server returns a real `404` status for unknown routes and for dishes that don't exist (for example `/foods/pizza`)
- [x] JSON API endpoints at `/api/foods` and `/api/foods/:slug`

## Video Walkthrough

**Note: please be sure to 

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  Add GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Each dish has a `slug` field (like `tacos-al-pastor`) so detail pages get readable URLs instead of numeric IDs. The Express server checks the slug before sending the detail page, so a dish that doesn't exist gets the 404 page instead of an empty detail page.

To run locally:

```bash
npm install
npm start
```

Then open http://localhost:3000.

## License

Copyright 2026 Dhimy Jean

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
