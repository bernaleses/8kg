import { useState, useEffect } from "react";

const COLORS = {
  bg: "#f5f2eb", card: "#ffffff", cardBorder: "#e8e2d9",
  accent: "#c8440a", text: "#1a1a1a", muted: "#8a7f72",
  red: "#c8440a", green: "#2d7a45", orange: "#c47a1a", blue: "#1a5c8a",
};

// ─── MEALS DATA ───────────────────────────────────────────────
const meals = {
  desayunos: [
    { name: "Tortilla de claras + avena", emoji: "🍳",
      ingredients: ["6 claras de huevo (180g)", "1 huevo entero (60g)", "40g avena en copos", "100g fresas", "Sal, pimienta, AOVE spray"],
      prep: "Bate claras + huevo, cocina en sartén antiadherente. Avena con agua en microondas 2 min.",
      macros: { kcal: 375, prot: 39, carb: 32, fat: 8 }, tupper: false },
    { name: "Yogurt griego + avena + plátano", emoji: "🥣",
      ingredients: ["200g yogurt griego 0%", "40g avena en copos", "1 plátano pequeño (100g)", "5g canela"],
      prep: "Mezcla todo en bol. Overnight oats: prepáralo la noche anterior en tupper.",
      macros: { kcal: 365, prot: 22, carb: 58, fat: 4 }, tupper: true },
    { name: "Tostadas centeno + huevos revueltos", emoji: "🍞",
      ingredients: ["2 rebanadas pan centeno (60g)", "3 huevos enteros", "100g tomate cherry", "Sal, pimienta, AOVE spray"],
      prep: "Revuelve huevos en sartén antiadherente. Tuesta el pan. Tomates crudos al lado.",
      macros: { kcal: 385, prot: 27, carb: 34, fat: 16 }, tupper: false },
    { name: "Batido proteico + avena", emoji: "🥤",
      ingredients: ["30g whey proteína", "300ml leche desnatada", "40g avena en copos", "1 cucharadita cacao puro"],
      prep: "Bate leche + whey. Avena con agua en microondas o mezclada cruda con el batido.",
      macros: { kcal: 385, prot: 43, carb: 40, fat: 5 }, tupper: true },
    { name: "Overnight oats completo", emoji: "🌙",
      ingredients: ["50g avena", "150g yogurt griego 0%", "150ml leche desnatada", "30g arándanos", "15g almendras laminadas"],
      prep: "Mezcla la noche anterior en tupper. Deja en nevera. Listo en 1 min por la mañana.",
      macros: { kcal: 395, prot: 21, carb: 50, fat: 10 }, tupper: true },
    { name: "Tostada centeno + aguacate + salmón ahumado", emoji: "🥑",
      ingredients: ["60g pan de centeno (2 rebanadas)", "40g aguacate", "60g salmón ahumado", "Limón, eneldo, pimienta negra"],
      prep: "Tuesta el pan. Aplasta el aguacate con limón. Coloca el salmón encima y añade eneldo.",
      macros: { kcal: 370, prot: 26, carb: 28, fat: 16 }, tupper: false },
    { name: "Protein pancakes de cottage", emoji: "🥞",
      ingredients: ["150g queso cottage 0%", "3 claras de huevo", "40g avena en copos", "Canela, edulcorante, AOVE spray"],
      prep: "Bate cottage + claras + avena hasta homogéneo. Cocina porciones en sartén antiadherente a fuego medio-bajo. 3-4 min por lado.",
      macros: { kcal: 380, prot: 36, carb: 34, fat: 6 }, tupper: true },
    { name: "Skyr + granola sin azúcar + arándanos", emoji: "🫐",
      ingredients: ["200g skyr natural", "30g granola sin azúcar añadido", "80g arándanos frescos"],
      prep: "Monta en bowl o tupper en capas. La granola encima para que no se ablande si lo preparas la noche anterior.",
      macros: { kcal: 355, prot: 26, carb: 46, fat: 5 }, tupper: true },
    { name: "Sándwich proteico de huevo y jamón", emoji: "🥪",
      ingredients: ["2 rebanadas pan integral (70g)", "2 huevos revueltos", "40g jamón serrano", "Tomate, pimienta, AOVE spray"],
      prep: "Revuelve los huevos con el jamón en sartén. Monta el sándwich con tomate. Rápido y contundente.",
      macros: { kcal: 390, prot: 30, carb: 32, fat: 14 }, tupper: false },
    { name: "Mug cake proteico", emoji: "☕",
      ingredients: ["40g avena en copos", "25g whey proteína chocolate", "1 huevo entero", "1 cucharadita cacao puro", "Agua c/s"],
      prep: "Mezcla todo con agua hasta pasta espesa. Microondas 90 segundos a potencia máxima. Deja reposar 1 min.",
      macros: { kcal: 365, prot: 34, carb: 32, fat: 8 }, tupper: false },
    { name: "Tortilla + jamón + queso fresco", emoji: "🍳",
      ingredients: ["3 huevos enteros", "40g jamón serrano", "50g queso fresco batido 0%", "Sal, pimienta, AOVE spray"],
      prep: "Bate los huevos con el queso fresco. Añade el jamón en trozos. Cocina en sartén antiadherente a fuego medio.",
      macros: { kcal: 375, prot: 36, carb: 2, fat: 24 }, tupper: false },
    { name: "Batido verde proteico", emoji: "💚",
      ingredients: ["25g whey proteína vainilla", "200ml leche desnatada", "50g espinacas frescas", "1 plátano pequeño (100g)"],
      prep: "Bate todo en licuadora 30 segundos. Beber inmediatamente o conservar en bote cerrado en nevera máx 8h.",
      macros: { kcal: 360, prot: 32, carb: 44, fat: 4 }, tupper: true },
    { name: "Bowl de requesón + aguacate + huevo", emoji: "🥗",
      ingredients: ["200g requesón o cottage 0%", "60g aguacate", "1 huevo duro", "100g tomate cherry", "10g AOVE", "Orégano, sal, pimienta"],
      prep: "Monta en bowl con el requesón de base. Aguacate en dados, huevo en rodajas, tomate cherry y AOVE. Listo en 3 min.",
      macros: { kcal: 420, prot: 30, carb: 14, fat: 26 }, tupper: true },
    { name: "Huevos al horno en tomate", emoji: "🍅",
      ingredients: ["2 huevos enteros", "200g salsa de tomate casera (o triturado)", "40g pan de centeno", "Ajo, orégano, AOVE"],
      prep: "Calienta el tomate en sartén apta para horno. Haz dos huecos y casca los huevos. Horno 180° 10-12 min.",
      macros: { kcal: 370, prot: 22, carb: 34, fat: 14 }, tupper: false },
    { name: "Gachas de arroz proteicas", emoji: "🍚",
      ingredients: ["50g arroz cocido (o 20g en seco)", "25g whey chocolate", "200ml leche desnatada", "Canela al gusto"],
      prep: "Calienta el arroz con la leche. Retira del fuego y disuelve el whey removiendo rápido. Añade canela.",
      macros: { kcal: 370, prot: 30, carb: 46, fat: 4 }, tupper: true },
    { name: "Requesón + miel + nueces", emoji: "🧀",
      ingredients: ["250g requesón o cottage 0%", "10g miel", "20g nueces", "Canela al gusto"],
      prep: "Mezcla en bowl, nueces encima. Listo en 2 min. Perfecto cuando no hay tiempo de cocinar.",
      macros: { kcal: 370, prot: 28, carb: 22, fat: 18 }, tupper: true },
    { name: "Yogur griego + avena + arándanos", emoji: "🫐",
      ingredients: ["250g yogurt griego 0%", "50g avena en copos", "80g arándanos frescos o congelados"],
      prep: "Mezcla avena + yogur, añade arándanos encima. Puedes dejarlo preparado la noche anterior.",
      macros: { kcal: 380, prot: 24, carb: 55, fat: 5 }, tupper: true },
    { name: "Avena con mantequilla de cacahuete + plátano", emoji: "🥜",
      ingredients: ["60g avena en copos", "2 cucharadas crema de cacahuete (30g)", "1 plátano (120g)", "200ml leche desnatada", "10g miel"],
      prep: "Avena con leche en microondas 3 min. Añade el plátano en rodajas, la crema de cacahuete y la miel. Ideal pre-carrera larga.",
      macros: { kcal: 540, prot: 20, carb: 78, fat: 16 }, tupper: true },
    { name: "Wrap de huevos + jamón + queso", emoji: "🌯",
      ingredients: ["1 tortilla integral grande (70g)", "3 huevos enteros", "50g jamón serrano", "30g queso semicurado", "Tomate, sal, AOVE spray"],
      prep: "Revuelve los huevos con el jamón. Monta el wrap con el queso y el tomate. Enrolla y come o llévalo en papel de aluminio.",
      macros: { kcal: 510, prot: 38, carb: 36, fat: 22 }, tupper: false },
    { name: "Bowl de quinoa + huevo + aguacate", emoji: "🥑",
      ingredients: ["60g quinoa (seco)", "2 huevos enteros", "80g aguacate", "100g tomate cherry", "Limón, sal, AOVE 10g"],
      prep: "Quinoa cocida 15 min. Huevos fritos o escalfados. Monta el bowl con aguacate en dados y tomates. Alíña con limón y AOVE.",
      macros: { kcal: 560, prot: 28, carb: 52, fat: 24 }, tupper: false },
    { name: "Tostadas francesas proteicas + fruta", emoji: "🍞",
      ingredients: ["3 rebanadas pan brioche integral (90g)", "3 huevos enteros", "100ml leche desnatada", "150g fresas o arándanos", "Canela, vainilla, AOVE spray"],
      prep: "Bate huevos con leche y canela. Empapa el pan y cocina en sartén 3 min por lado. Sirve con fruta.",
      macros: { kcal: 490, prot: 32, carb: 56, fat: 14 }, tupper: false },
    { name: "Batido hipercalórico de recuperación", emoji: "💪",
      ingredients: ["30g whey proteína chocolate", "60g avena en copos", "1 plátano maduro (120g)", "20g mantequilla de almendras", "300ml leche desnatada"],
      prep: "Bate todo en licuadora. Ideal post-carrera larga de más de 15 km o día de full body intenso.",
      macros: { kcal: 620, prot: 42, carb: 80, fat: 14 }, tupper: false },
    { name: "Gofres proteicos con plátano", emoji: "🧇",
      ingredients: ["50g avena molida", "150g yogurt griego 0%", "2 huevos enteros", "1 plátano (120g)", "Canela, levadura en polvo, AOVE spray"],
      prep: "Tritura avena con yogur, huevos y canela. Cocina en gofrera o sartén pequeña. Sirve con plátano en rodajas.",
      macros: { kcal: 490, prot: 30, carb: 62, fat: 12 }, tupper: false },  ],
  almuerzos: [
    { name: "Pollo + arroz basmati + brócoli", emoji: "🍗",
      ingredients: ["200g pechuga de pollo", "60g arroz basmati (seco)", "200g brócoli", "Sal, especias, AOVE spray"],
      prep: "Pollo a la plancha o al horno 200° 20 min. Arroz cocido. Brócoli al vapor 5 min. Tupper.",
      macros: { kcal: 520, prot: 52, carb: 52, fat: 7 }, tupper: true },
    { name: "Pollo al curry + arroz integral", emoji: "🍛",
      ingredients: ["200g pechuga de pollo troceada", "60g arroz integral (seco)", "100g cebolla", "Curry, cúrcuma, comino, AOVE spray"],
      prep: "Saltea pollo con cebolla y especias 10 min. Arroz integral cocido 25 min. Mezcla en tupper.",
      macros: { kcal: 510, prot: 47, carb: 53, fat: 8 }, tupper: true },
    { name: "Salmón al horno + boniato + espinacas", emoji: "🐟",
      ingredients: ["180g salmón fresco (lomo)", "200g boniato", "150g espinacas frescas", "Eneldo, zumo limón, sal, AOVE spray"],
      prep: "Boniato al horno 200° 35 min. Salmón al horno 180° 15 min. Espinacas salteadas 2 min.",
      macros: { kcal: 520, prot: 42, carb: 40, fat: 18 }, tupper: true },
    { name: "Ternera magra + quinoa + espinacas", emoji: "🥩",
      ingredients: ["200g ternera picada 5% grasa", "50g quinoa (seco)", "150g espinacas frescas", "Ajo, sal, AOVE spray"],
      prep: "Saltea la ternera con ajo. Quinoa cocida 15 min. Espinacas salteadas 2 min. Mezcla en tupper.",
      macros: { kcal: 530, prot: 48, carb: 38, fat: 14 }, tupper: true },
    { name: "Pollo teriyaki + arroz + edamame", emoji: "🍱",
      ingredients: ["200g pechuga de pollo", "60g arroz jazmín (seco)", "80g edamame descongelado", "Salsa teriyaki light 20ml, sésamo"],
      prep: "Marina el pollo en teriyaki 10 min. Cocina a la plancha. Arroz cocido. Edamame al micro 3 min.",
      macros: { kcal: 530, prot: 50, carb: 55, fat: 9 }, tupper: true },
    { name: "Pollo al limón + patata + brócoli", emoji: "🍋",
      ingredients: ["200g muslo de pollo sin piel", "200g patata", "150g brócoli", "Limón, romero, ajo, AOVE"],
      prep: "Todo al horno 200° con limón y romero durante 35 min. Brócoli al vapor los últimos 5 min.",
      macros: { kcal: 510, prot: 44, carb: 42, fat: 14 }, tupper: true },
    { name: "Bowl de pollo asado + boniato + aguacate", emoji: "🥑",
      ingredients: ["200g pechuga de pollo", "150g boniato asado", "50g aguacate", "Ensalada mixta, limón, sal"],
      prep: "Pollo y boniato al horno juntos 25 min. Monta el bowl con la ensalada y el aguacate en el momento.",
      macros: { kcal: 540, prot: 46, carb: 38, fat: 18 }, tupper: true },
    { name: "Carne picada + patata cocida + espinacas", emoji: "🫕",
      ingredients: ["200g carne picada magra 5% grasa", "300g patata cocida", "150g espinacas", "Ajo, AOVE spray, sal"],
      prep: "Saltea la carne con ajo. Patata cocida previamente. Espinacas salteadas 2 min. Todo en tupper.",
      macros: { kcal: 540, prot: 46, carb: 45, fat: 14 }, tupper: true },
    { name: "Ternera magra + arroz + zanahoria", emoji: "🥕",
      ingredients: ["180g ternera magra", "60g arroz (seco)", "150g zanahoria", "Caldo, laurel, sal, AOVE spray"],
      prep: "Ternera a la plancha o en guiso suave. Arroz cocido. Zanahoria al vapor o cocida. Tupper.",
      macros: { kcal: 500, prot: 44, carb: 48, fat: 10 }, tupper: true },
    { name: "Pollo tikka masala + arroz basmati", emoji: "🫕",
      ingredients: ["200g pechuga de pollo", "60g arroz basmati (seco)", "100g tomate triturado", "80g yogur griego 0%", "Curry, cúrcuma, comino, ajo, AOVE"],
      prep: "Marina el pollo en yogur+especias 10 min. Saltea con tomate 10 min. Arroz cocido. Mezcla en tupper.",
      macros: { kcal: 520, prot: 50, carb: 50, fat: 9 }, tupper: true },
    { name: "Pollo con champiñones al ajillo + patata", emoji: "🍄",
      ingredients: ["200g pechuga de pollo", "150g champiñones", "200g patata cocida", "Ajo laminado, perejil, AOVE 10g"],
      prep: "Saltea el ajo con AOVE. Añade el pollo y los champiñones 8 min. Patata cocida aparte. Tupper.",
      macros: { kcal: 510, prot: 46, carb: 40, fat: 12 }, tupper: true },
    { name: "Pollo marroquí (chermoula) + cuscús", emoji: "🌍",
      ingredients: ["200g pechuga de pollo", "60g cuscús (seco)", "Comino, cilantro, pimentón, limón, ajo, AOVE 10g"],
      prep: "Marina el pollo con especias 20 min. A la plancha 6 min por lado. Cuscús: agua hirviendo, tapa 5 min.",
      macros: { kcal: 515, prot: 48, carb: 50, fat: 11 }, tupper: true },
    { name: "Hamburguesa de ternera + boniato chips", emoji: "🍔",
      ingredients: ["200g ternera picada 5%", "200g boniato", "Ajo en polvo, sal, pimienta, AOVE spray"],
      prep: "Boniato en láminas al horno 200° 25 min. Forma la hamburguesa y cocina a la plancha 4 min por lado.",
      macros: { kcal: 530, prot: 44, carb: 42, fat: 16 }, tupper: true },
    { name: "Berenjena rellena de carne picada", emoji: "🍆",
      ingredients: ["1 berenjena grande (300g)", "220g carne picada magra 5%", "100g tomate triturado", "50g mozzarella light", "60g arroz cocido"],
      prep: "Mezcla la carne salteada con el arroz cocido y el tomate. Rellena la berenjena, cubre con mozzarella. Horno 200° 20 min.",
      macros: { kcal: 570, prot: 48, carb: 36, fat: 22 }, tupper: true },
    { name: "Wok de ternera + brócoli + arroz", emoji: "🥦",
      ingredients: ["180g ternera magra en tiras", "200g brócoli", "60g arroz (seco)", "Salsa soja light 20ml, ajo, jengibre"],
      prep: "Wok muy caliente. Ternera 2 min, añade brócoli y soja, 4 min más. Arroz cocido aparte. Tupper.",
      macros: { kcal: 510, prot: 46, carb: 48, fat: 10 }, tupper: true },
    { name: "Pasta integral + pollo + pesto + parmesano", emoji: "🍝",
      ingredients: ["80g pasta integral (seco)", "200g pechuga de pollo", "20g pesto", "15g parmesano rallado", "Sal, pimienta"],
      prep: "Pasta cocida al dente 10 min. Pollo a la plancha en trozos. Mezcla con pesto caliente. Parmesano encima.",
      macros: { kcal: 680, prot: 54, carb: 68, fat: 18 }, tupper: true },
    { name: "Ternera + arroz + aguacate + huevo frito", emoji: "🥩",
      ingredients: ["200g ternera magra", "70g arroz basmati (seco)", "60g aguacate", "1 huevo entero", "Salsa soja, sal, AOVE 10g"],
      prep: "Arroz cocido. Ternera a la plancha. Huevo frito en sartén con AOVE. Monta el bowl con aguacate y soja.",
      macros: { kcal: 710, prot: 54, carb: 60, fat: 26 }, tupper: false },
    { name: "Bowl de salmón + arroz + edamame + aguacate", emoji: "🐟",
      ingredients: ["200g salmón fresco", "70g arroz jazmín (seco)", "80g edamame descongelado", "50g aguacate", "Soja light, sésamo, jengibre"],
      prep: "Arroz cocido. Salmón al horno 15 min. Monta el bowl con edamame y aguacate. Aliña con soja y jengibre.",
      macros: { kcal: 720, prot: 52, carb: 64, fat: 26 }, tupper: true },
    { name: "Pollo + boniato grande + frutos secos", emoji: "🍠",
      ingredients: ["220g pechuga de pollo", "300g boniato", "25g almendras + nueces", "Romero, ajo, AOVE 10g"],
      prep: "Boniato al horno 35 min. Pollo a la plancha con ajo. Sirve con frutos secos encima del boniato caliente.",
      macros: { kcal: 690, prot: 52, carb: 62, fat: 22 }, tupper: true },
    { name: "Estofado de ternera + patata + pan centeno", emoji: "🫕",
      ingredients: ["200g ternera para guisar", "250g patata", "150g zanahoria", "40g pan de centeno", "Caldo, laurel, AOVE"],
      prep: "Estofado lento 45 min. La patata absorbe el caldo. Con el pan de centeno alcanza las kcal de carga.",
      macros: { kcal: 650, prot: 46, carb: 68, fat: 14 }, tupper: true },  ],
  cenas: [
    { name: "Pollo + verduras asadas al horno", emoji: "🍗",
      ingredients: ["220g pechuga de pollo", "150g calabacín", "150g berenjena", "100g cebolla", "Hierbas provenzales, sal, AOVE spray"],
      prep: "Todo al horno 200° durante 25 min. Ideal para batch cooking del domingo.",
      macros: { kcal: 400, prot: 48, carb: 20, fat: 8 }, tupper: true },
    { name: "Salmón al horno + calabacín", emoji: "🐟",
      ingredients: ["180g salmón fresco", "200g calabacín en rodajas", "100g tomate cherry", "Eneldo, limón, sal, AOVE spray"],
      prep: "Salmón al horno 180° 15 min. Calabacín a la plancha o al horno junto. Tomates crudos al lado.",
      macros: { kcal: 415, prot: 40, carb: 12, fat: 20 }, tupper: true },
    { name: "Tortilla de claras + espinacas + champiñones", emoji: "🍄",
      ingredients: ["3 huevos enteros", "100g claras pasteurizadas", "150g espinacas", "100g champiñones", "Sal, ajo en polvo"],
      prep: "Saltea espinacas y champiñones. Añade huevos batidos. Fuego medio hasta cuajar.",
      macros: { kcal: 390, prot: 41, carb: 8, fat: 20 }, tupper: false },
    { name: "Pollo + ensalada grande + huevos duros", emoji: "🥗",
      ingredients: ["220g pechuga de pollo", "Lechuga, tomate, pepino (ilimitado)", "2 huevos duros", "Limón, mostaza, sal"],
      prep: "Pollo a la plancha. Huevos duros 10 min. Monta la ensalada y alíña con limón y mostaza.",
      macros: { kcal: 440, prot: 54, carb: 8, fat: 16 }, tupper: true },
    { name: "Ternera + calabacín y champiñones salteados", emoji: "🥩",
      ingredients: ["200g ternera magra en tiras", "200g calabacín", "100g champiñones", "Salsa soja baja sal 15ml, ajo"],
      prep: "Saltea ternera a fuego fuerte 3 min. Añade verduras, soja y ajo. Listo en 8 min.",
      macros: { kcal: 410, prot: 46, carb: 10, fat: 18 }, tupper: true },
    { name: "Crema de calabaza + huevo poché + pan centeno", emoji: "🎃",
      ingredients: ["300g calabaza", "2 huevos", "15g AOVE", "2 rebanadas pan centeno (60g)", "Sal, nuez moscada, caldo de verduras"],
      prep: "Cuece la calabaza en caldo 20 min, tritura con AOVE. Escalfa los huevos 3 min. Sirve con el pan de centeno tostado.",
      macros: { kcal: 480, prot: 24, carb: 46, fat: 22 }, tupper: false },
    { name: "Salmón al vapor con jengibre + brócoli", emoji: "🐟",
      ingredients: ["180g salmón fresco", "200g brócoli", "Jengibre rallado 5g", "Salsa soja light 10ml, limón"],
      prep: "Salmón al vapor 12 min. Brócoli al vapor 5 min. Aliña con jengibre, soja y limón al momento.",
      macros: { kcal: 410, prot: 40, carb: 10, fat: 22 }, tupper: true },
    { name: "Rollitos de lechuga con carne + arroz jazmín", emoji: "🥬",
      ingredients: ["200g ternera picada 5%", "8 hojas lechuga romana", "60g arroz jazmín cocido", "Soja light 15ml", "Ajo, jengibre, sésamo"],
      prep: "Saltea la carne con ajo, jengibre y soja 5 min. Mezcla con el arroz. Sirve dentro de las hojas de lechuga.",
      macros: { kcal: 490, prot: 46, carb: 42, fat: 14 }, tupper: false },
    { name: "Pollo en salsa de mostaza + calabacín", emoji: "🍋",
      ingredients: ["220g pechuga de pollo", "200g calabacín", "15g mostaza de Dijon", "80g yogur griego 0%, sal"],
      prep: "Pollo a la plancha. Mezcla mostaza+yogur como salsa. Calabacín a la plancha. Sirve la salsa encima.",
      macros: { kcal: 405, prot: 52, carb: 8, fat: 14 }, tupper: true },
    { name: "Tortilla española proteica", emoji: "🥚",
      ingredients: ["3 huevos enteros", "100g claras pasteurizadas", "200g patata cocida", "1/2 cebolla (80g)", "AOVE spray"],
      prep: "Sofríe la cebolla. Mezcla huevos+claras+patata cocida en dados. Cocina tapada a fuego suave 8 min.",
      macros: { kcal: 430, prot: 38, carb: 30, fat: 16 }, tupper: true },
    { name: "Pollo al ajillo + espárragos trigueros", emoji: "🌾",
      ingredients: ["220g pechuga de pollo", "200g espárragos trigueros", "4 dientes ajo", "Limón, AOVE 10g, perejil"],
      prep: "Dora el ajo en AOVE. Añade el pollo en trozos 6 min. Espárragos a la plancha paralelo. Exprime limón.",
      macros: { kcal: 390, prot: 50, carb: 8, fat: 16 }, tupper: true },
    { name: "Sopa de pollo con fideos", emoji: "🍜",
      ingredients: ["200g pechuga de pollo", "40g fideos finos", "150g zanahoria", "Caldo casero, laurel, sal"],
      prep: "Cuece el pollo en caldo 15 min. Desmenuza. Añade fideos y zanahoria 8 min más. Ideal post-carrera larga.",
      macros: { kcal: 390, prot: 42, carb: 32, fat: 6 }, tupper: true },
    { name: "Revuelto de claras + gambas + espárragos + patata", emoji: "🍤",
      ingredients: ["150g claras pasteurizadas", "100g gambas peladas", "150g espárragos", "200g patata cocida en dados", "Ajo, AOVE 10g, sal"],
      prep: "Saltea la patata con ajo y AOVE 4 min. Añade gambas y espárragos 3 min más. Vuelca las claras y revuelve hasta cuajar.",
      macros: { kcal: 490, prot: 48, carb: 36, fat: 14 }, tupper: false },
    { name: "Pollo con berenjena al horno", emoji: "🍆",
      ingredients: ["220g pechuga de pollo", "200g berenjena", "100g tomate triturado", "Orégano, ajo, AOVE spray"],
      prep: "Berenjena en rodajas al horno con tomate 15 min. Añade el pollo encima otros 20 min a 200°. Tupper.",
      macros: { kcal: 400, prot: 50, carb: 14, fat: 10 }, tupper: true },
    { name: "Ternera + champiñones + crema de coliflor", emoji: "🥦",
      ingredients: ["200g ternera magra", "100g champiñones", "250g coliflor", "Ajo, caldo, AOVE 10g, nuez moscada"],
      prep: "Coliflor cocida 15 min y triturada con caldo. Ternera y champiñones a la plancha. Sirve sobre la crema.",
      macros: { kcal: 410, prot: 48, carb: 12, fat: 18 }, tupper: true },
    { name: "Pollo al pesto + calabacín a la plancha", emoji: "🌿",
      ingredients: ["220g pechuga de pollo", "200g calabacín en rodajas", "15g pesto ligero", "Sal, pimienta"],
      prep: "Pollo a la plancha 6 min por lado. Unta pesto al final. Calabacín a la plancha paralelo.",
      macros: { kcal: 420, prot: 50, carb: 8, fat: 18 }, tupper: true },
    { name: "Ternera magra + espárragos + AOVE", emoji: "🌾",
      ingredients: ["200g ternera magra", "200g espárragos verdes", "10g aceite oliva virgen extra", "Sal, limón"],
      prep: "Ternera a la plancha 3-4 min por lado. Espárragos a la plancha o al vapor. Alíña con AOVE y limón.",
      macros: { kcal: 400, prot: 46, carb: 5, fat: 18 }, tupper: true },
    { name: "Pollo + ensalada + aguacate", emoji: "🥑",
      ingredients: ["200g pechuga de pollo", "Lechuga + tomate grande 250g", "60g aguacate", "AOVE, limón, sal"],
      prep: "Pollo a la plancha. Monta la ensalada con aguacate en dados. Alíña al momento.",
      macros: { kcal: 430, prot: 46, carb: 8, fat: 22 }, tupper: true },
    { name: "Salmón al horno + patata + ensalada AOVE", emoji: "🐟",
      ingredients: ["200g salmón fresco", "250g patata cocida", "Ensalada mixta grande", "15g AOVE", "Limón, sal, eneldo"],
      prep: "Salmón al horno 15 min. Patata cocida. Ensalada aliñada generosamente con AOVE. Cena de recuperación.",
      macros: { kcal: 540, prot: 44, carb: 38, fat: 24 }, tupper: false },
    { name: "Pollo al horno + boniato + guacamole", emoji: "🥑",
      ingredients: ["220g pechuga de pollo", "250g boniato", "60g aguacate", "Limón, cilantro, sal, AOVE spray"],
      prep: "Boniato y pollo al horno juntos 30 min. Aplasta el aguacate con limón y sal. Sirve el guacamole encima.",
      macros: { kcal: 560, prot: 50, carb: 48, fat: 16 }, tupper: true },
    { name: "Ternera + arroz basmati + brócoli + AOVE", emoji: "🥩",
      ingredients: ["200g ternera magra", "60g arroz basmati (seco)", "200g brócoli", "15g AOVE", "Ajo, limón, sal"],
      prep: "La misma combinación clásica pero con más grasa saludable. El AOVE extra sube las calorías sin afectar la saciedad.",
      macros: { kcal: 530, prot: 48, carb: 52, fat: 14 }, tupper: true },
    { name: "Tortilla española + ensalada + pan centeno", emoji: "🥚",
      ingredients: ["3 huevos + 2 claras", "200g patata cocida", "1/2 cebolla", "Ensalada mixta", "40g pan centeno", "AOVE 10g"],
      prep: "Tortilla española con cebolla pochada. Ensalada aliñada. Pan de centeno al lado. Cena completa y saciante.",
      macros: { kcal: 520, prot: 36, carb: 46, fat: 18 }, tupper: false },
    { name: "Pasta integral + ternera + salsa de tomate", emoji: "🍝",
      ingredients: ["70g pasta integral (seco)", "150g ternera picada 5%", "150g tomate triturado", "Ajo, orégano, AOVE spray"],
      prep: "Pasta cocida al dente. Saltea la ternera con ajo, añade tomate y reduce 10 min. Mezcla con la pasta.",
      macros: { kcal: 550, prot: 44, carb: 62, fat: 12 }, tupper: true },  ],
  media_manana: [
    { name: "Skyr + frutos rojos + granola + almendras", emoji: "🍓",
      ingredients: ["200g skyr natural", "80g frutos rojos mixtos", "20g granola sin azúcar", "15g almendras laminadas"],
      prep: "Monta en capas. La granola y las almendras dan textura y suben las calorías a un nivel útil de media mañana.",
      macros: { kcal: 310, prot: 24, carb: 32, fat: 9 }, tupper: true },
    { name: "Huevos duros + aguacate + tomate", emoji: "🥚",
      ingredients: ["2 huevos duros", "50g aguacate", "1 tomate mediano (150g)", "Sal, limón, AOVE spray"],
      prep: "Huevos del batch cooking del domingo. Aguacate en dados con limón. Snack completo y saciante.",
      macros: { kcal: 250, prot: 16, carb: 8, fat: 16 }, tupper: true },
    { name: "Tortilla de claras + pavo + queso", emoji: "🍳",
      ingredients: ["3 claras de huevo", "1 huevo entero", "40g pavo en lonchas", "20g queso fresco batido", "Sal, especias"],
      prep: "Bate claras con el huevo, añade el pavo en trozos. Cocina en sartén pequeña. Come con el queso encima.",
      macros: { kcal: 220, prot: 30, carb: 2, fat: 10 }, tupper: true },
    { name: "Jamón ibérico + manzana", emoji: "🍎",
      ingredients: ["50g jamón ibérico (sin grasa visible)", "1 manzana (150g)"],
      prep: "Come por separado. El ibérico aporta proteína + grasa de calidad. La manzana, fibra y saciedad.",
      macros: { kcal: 175, prot: 14, carb: 22, fat: 6 }, tupper: false },
    { name: "Smoothie proteico express", emoji: "🥤",
      ingredients: ["20g whey proteína vainilla", "150ml leche desnatada", "50g fresas frescas o congeladas"],
      prep: "Bate o agita en shaker. Consume en 10 min. Preparado en menos de 2 minutos.",
      macros: { kcal: 165, prot: 22, carb: 14, fat: 2 }, tupper: false },
    { name: "Queso fresco + pepino + nueces + tomate", emoji: "🧀",
      ingredients: ["150g queso fresco batido 0%", "100g pepino", "100g tomate cherry", "20g nueces", "Sal, AOVE 5g, eneldo"],
      prep: "Mezcla en tupper. Las nueces y el AOVE convierten este snack ligero en una media mañana real y saciante.",
      macros: { kcal: 270, prot: 18, carb: 10, fat: 18 }, tupper: true },
    { name: "Pollo frío + tortitas de arroz + mostaza", emoji: "🍗",
      ingredients: ["120g pechuga de pollo cocida", "2 tortitas de arroz (18g)", "1 cucharada mostaza Dijon", "100g tomate cherry"],
      prep: "Pollo del batch cooking partido en tiras. Tortitas como base. Tomates al lado. Snack completo.",
      macros: { kcal: 250, prot: 32, carb: 22, fat: 4 }, tupper: true },
    { name: "Mix de nueces + arándanos secos", emoji: "🫐",
      ingredients: ["20g nueces crudas", "20g arándanos secos sin azúcar añadido"],
      prep: "Prepara porciones en bolsitas el domingo. Snack de bolsillo para cuando estás fuera.",
      macros: { kcal: 180, prot: 4, carb: 18, fat: 12 }, tupper: false },
    { name: "Café proteico (protein latte)", emoji: "☕",
      ingredients: ["25g whey vainilla", "1 espresso (30ml)", "150ml leche desnatada fría"],
      prep: "Mezcla la leche fría con el whey hasta disolver. Añade el espresso. Agita bien. Frío o templado.",
      macros: { kcal: 160, prot: 22, carb: 10, fat: 2 }, tupper: false },
    { name: "Zanahoria + hummus de yogur + almendras", emoji: "🥕",
      ingredients: ["150g zanahoria en palitos", "100g yogurt griego 0%", "1 cucharadita tahini (10g)", "20g almendras", "Limón, sal"],
      prep: "Mezcla el yogur con el tahini y limón para hacer un dip casero. Sirve con zanahorias y almendras al lado.",
      macros: { kcal: 270, prot: 16, carb: 20, fat: 14 }, tupper: true },
    { name: "Yogurt griego + nueces", emoji: "🥜",
      ingredients: ["200g yogurt griego 0%", "20g nueces"],
      prep: "Mezcla y listo. Cómelo entre el desayuno y el almuerzo.",
      macros: { kcal: 200, prot: 16, carb: 10, fat: 11 }, tupper: true },
    { name: "Requesón + fresas + avena + miel", emoji: "🍓",
      ingredients: ["150g requesón 0%", "100g fresas", "20g avena en copos", "8g miel"],
      prep: "Mezcla en bowl. La avena aporta carbos lentos y la miel da el toque dulce. Tupper perfecto para llevar.",
      macros: { kcal: 250, prot: 18, carb: 34, fat: 2 }, tupper: true },
    { name: "Jamón serrano + pan integral", emoji: "🥖",
      ingredients: ["60g jamón serrano (sin grasa visible)", "40g pan integral"],
      prep: "Prepara en 1 min. Portátil y saciante. Ideal para llevar al trabajo.",
      macros: { kcal: 175, prot: 16, carb: 18, fat: 4 }, tupper: false },
    { name: "2 huevos cocidos + mandarina", emoji: "🍊",
      ingredients: ["2 huevos duros", "1 mandarina (150g)"],
      prep: "Cuece los huevos el domingo en batch. Lleva en tupper con la fruta entera.",
      macros: { kcal: 190, prot: 14, carb: 16, fat: 10 }, tupper: true },
    { name: "Almendras + manzana", emoji: "🍎",
      ingredients: ["25g almendras crudas", "1 manzana media (150g)"],
      prep: "Ideal cuando estás fuera de casa. Sin nevera necesaria.",
      macros: { kcal: 195, prot: 5, carb: 28, fat: 12 }, tupper: false },
    { name: "Tostada + mantequilla de cacahuete + plátano", emoji: "🍌",
      ingredients: ["2 rebanadas pan integral (70g)", "30g crema de cacahuete", "1 plátano mediano (120g)"],
      prep: "Tuesta el pan, unta la crema de cacahuete, plátano en rodajas encima. Ideal para días de mayor gasto.",
      macros: { kcal: 430, prot: 14, carb: 62, fat: 14 }, tupper: false },
    { name: "Batido de plátano + avena + almendras", emoji: "🥤",
      ingredients: ["1 plátano maduro (120g)", "40g avena", "20g almendras", "200ml leche desnatada", "25g whey"],
      prep: "Bate todo en licuadora. Snack denso para días de mayor volumen de entrenamiento.",
      macros: { kcal: 460, prot: 32, carb: 56, fat: 12 }, tupper: false },
    { name: "Yogur + granola + fruta + nueces", emoji: "🥣",
      ingredients: ["200g yogurt griego 0%", "30g granola sin azúcar", "100g fruta fresca", "20g nueces"],
      prep: "Monta en capas en tupper. Granola y nueces suben las calorías para días de alta actividad.",
      macros: { kcal: 380, prot: 20, carb: 44, fat: 14 }, tupper: true },
    { name: "Pan integral + aguacate + huevo duro", emoji: "🥑",
      ingredients: ["2 rebanadas pan integral (70g)", "60g aguacate", "2 huevos duros", "Sal, pimienta, limón"],
      prep: "Aplasta el aguacate sobre el pan. Huevos duros del batch cooking encima en rodajas.",
      macros: { kcal: 410, prot: 22, carb: 34, fat: 20 }, tupper: false },
  ],
  pre_entreno: [
    { name: "Arroz blanco + pollo + soja", emoji: "🍚",
      ingredients: ["60g arroz blanco (seco)", "150g pechuga de pollo", "Soja light 15ml, ajo en polvo"],
      prep: "El clásico de gym. Arroz cocido, pollo a la plancha, aliña con soja. Prepara en batch el domingo.",
      macros: { kcal: 380, prot: 38, carb: 46, fat: 5 }, tupper: true },
    { name: "Boniato cocido + pollo frío", emoji: "🍠",
      ingredients: ["200g boniato cocido", "120g pechuga de pollo cocida", "Sal, pimentón"],
      prep: "Ambos del batch cooking del domingo. Cómelo frío o calienta en microondas 2 min. Carbos + proteína perfectos.",
      macros: { kcal: 360, prot: 32, carb: 44, fat: 4 }, tupper: true },
    { name: "Tostada integral + miel + requesón", emoji: "🍯",
      ingredients: ["60g pan integral (2 rebanadas)", "10g miel", "100g requesón 0%"],
      prep: "Unta el requesón y añade la miel. La miel da carbos rápidos ideales 45 min antes del entreno.",
      macros: { kcal: 310, prot: 16, carb: 50, fat: 3 }, tupper: false },
    { name: "Batido tropical pre-entreno", emoji: "🥭",
      ingredients: ["30g whey proteína", "150ml agua de coco", "100g mango congelado o fresco"],
      prep: "Bate todo. El agua de coco aporta electrolitos naturales. Ideal 30-45 min antes de carrera o fuerza.",
      macros: { kcal: 280, prot: 26, carb: 36, fat: 2 }, tupper: false },
    { name: "Dátiles + almendras + whey disuelto", emoji: "🌴",
      ingredients: ["3 dátiles medianos (45g)", "20g almendras crudas", "20g whey en 100ml agua"],
      prep: "Come dátiles y almendras juntos, bebe el whey disuelto aparte. Energía inmediata + proteína.",
      macros: { kcal: 290, prot: 18, carb: 34, fat: 8 }, tupper: false },
    { name: "Bowl mini de avena + miel + plátano", emoji: "🍌",
      ingredients: ["35g avena en copos", "10g miel", "½ plátano (60g)", "Agua o leche desnatada 150ml"],
      prep: "Avena en microondas 2 min con leche. Añade miel y plátano en rodajas. Toma 60-90 min antes de entrenar.",
      macros: { kcal: 270, prot: 8, carb: 52, fat: 3 }, tupper: true },
    { name: "Yogur + fruta + avena + miel (pre-entreno suave)", emoji: "🍊",
      ingredients: ["200g yogurt griego 0%", "150g fruta de temporada", "30g avena en copos", "10g miel"],
      prep: "Mezcla todo en tupper la noche anterior. Carbos de absorción mixta — perfectos 60-90 min antes del entreno.",
      macros: { kcal: 350, prot: 20, carb: 56, fat: 2 }, tupper: true },
    { name: "Galletas de avena caseras", emoji: "🍪",
      ingredients: ["50g avena", "1 huevo entero", "1 plátano maduro (100g)", "Canela, cacao puro opcional"],
      prep: "Aplasta el plátano, mezcla todo. Forma galletas. Horno 180° 12 min. Prepara el domingo en batch.",
      macros: { kcal: 295, prot: 10, carb: 48, fat: 6 }, tupper: true },
    { name: "Batido de mango + chía + whey", emoji: "🥭",
      ingredients: ["30g whey proteína", "100g mango", "10g semillas de chía", "200ml agua o leche desnatada"],
      prep: "Bate todo. Deja 5 min reposar para que la chía absorba. Hidratante y con omega-3 extra.",
      macros: { kcal: 285, prot: 28, carb: 30, fat: 6 }, tupper: false },
    { name: "Protein pancakes pre-entreno", emoji: "🥞",
      ingredients: ["40g avena", "150g cottage 0%", "2 claras de huevo", "Extracto de vainilla, canela"],
      prep: "Bate todo hasta homogéneo. Cocina en sartén 3-4 min por lado. Prepara el día anterior y recalienta.",
      macros: { kcal: 330, prot: 30, carb: 36, fat: 5 }, tupper: true },
    { name: "Batido whey + plátano + leche (post-entreno)", emoji: "💪",
      ingredients: ["25g whey proteína", "1 plátano mediano (120g)", "200ml leche desnatada"],
      prep: "Bate o agita. El plátano aporta carbos rápidos para reponer glucógeno. Tomar en los primeros 30 min.",
      macros: { kcal: 320, prot: 30, carb: 42, fat: 3 }, tupper: false },
    { name: "Plátano + whey", emoji: "🍌",
      ingredients: ["30g whey proteína", "1 plátano (120g)"],
      prep: "Batido o por separado. Ideal 30-45 min antes de entrenar para carbos rápidos.",
      macros: { kcal: 235, prot: 26, carb: 30, fat: 1 }, tupper: false },
    { name: "Yogur griego + miel + plátano + almendras", emoji: "🍯",
      ingredients: ["200g yogurt griego 0%", "10g miel", "1 plátano pequeño (100g)", "15g almendras"],
      prep: "Mezcla en bol. Toma 60-90 min antes del entreno. Combina proteína, carbos y grasas para un pre-entreno completo.",
      macros: { kcal: 340, prot: 22, carb: 46, fat: 6 }, tupper: true },
    { name: "Sándwich integral + pollo + aguacate", emoji: "🥪",
      ingredients: ["2 rebanadas pan integral (70g)", "80g pechuga de pollo en lonchas", "40g aguacate", "Mostaza, tomate, sal"],
      prep: "Monta el sándwich con todos los ingredientes. Las grasas del aguacate alargan la energía durante el entreno.",
      macros: { kcal: 370, prot: 28, carb: 34, fat: 12 }, tupper: false },
    { name: "Tortitas de arroz + cacahuete + plátano + whey", emoji: "🥜",
      ingredients: ["3 tortitas de arroz (27g)", "25g crema de cacahuete", "1 plátano pequeño (100g)", "20g whey en 100ml agua"],
      prep: "Tortitas con crema de cacahuete. Plátano al lado. Batido de whey. Snack pre-entreno completo y rápido.",
      macros: { kcal: 370, prot: 22, carb: 48, fat: 10 }, tupper: false },
  ],
};

// ─── WEEK PLAN ────────────────────────────────────────────────
const weekPlan = [
  { day: "LUN", name: "Push 💪 + Running (entrenador)", color: COLORS.accent,
    blocks: [{ time: "7:00", a: "Desayuno con proteína y carbos" }, { time: "9:00", a: "Sesión PUSH — ver bloques de entrenamiento abajo" }, { time: "14:00", a: "Almuerzo — comida más grande del día" }, { time: "19:00", a: "Cena ligera + snack proteico" }],
    notes: "Día de carbos: arroz o patata en el almuerzo." },
  { day: "MAR", name: "Running (entrenador)", color: COLORS.blue,
    blocks: [{ time: "7:00", a: "Desayuno con carbos" }, { time: "Según entrena.", a: "Running según plan de tu entrenador" }, { time: "14:00", a: "Almuerzo tupper" }, { time: "19:00", a: "Cena ligera" }],
    notes: "Come antes del running. Snack proteico post-entreno." },
  { day: "MIÉ", name: "Pull 🏋️ + Running (entrenador)", color: COLORS.accent,
    blocks: [{ time: "9:00", a: "Sesión PULL — ver bloques de entrenamiento abajo" }, { time: "14:00", a: "Almuerzo con carbos (quinoa/arroz)" }, { time: "19:00", a: "Cena proteica ligera" }],
    notes: "Día de carga: +150-200 kcal extras en carbos." },
  { day: "JUE", name: "Running (entrenador)", color: COLORS.blue,
    blocks: [{ time: "7:00", a: "Desayuno con carbos" }, { time: "Según entrena.", a: "Running según plan de tu entrenador" }, { time: "14:00", a: "Almuerzo tupper" }, { time: "19:00", a: "Cena" }],
    notes: "Descansa bien esta noche — mañana Full Body." },
  { day: "VIE", name: "Full Body 🔥", color: COLORS.accent,
    blocks: [{ time: "9:00", a: "Sesión FULL BODY — ver bloques de entrenamiento abajo" }, { time: "14:00", a: "Almuerzo tupper" }, { time: "19:00", a: "Cena" }],
    notes: "Sin running hoy — fuerza pura." },
  { day: "SÁB", name: "Running largo (entrenador)", color: COLORS.orange,
    blocks: [{ time: "7:30", a: "Desayuno rico en carbos: avena + plátano + yogurt" }, { time: "Según entrena.", a: "Long run según plan de tu entrenador" }, { time: "Post-run", a: "Batido proteico + plátano inmediato" }, { time: "14:00", a: "Almuerzo +200 kcal carbos extra (boniato/arroz)" }, { time: "19:00", a: "Cena normal del plan" }],
    notes: "⚠️ Añade 200-300 kcal en carbos al almuerzo. No recortes." },
  { day: "DOM", name: "Descanso Total", color: COLORS.muted,
    blocks: [{ time: "Mañana", a: "Batch cooking: prepara tuppers de 3-4 días" }, { time: "Todo el día", a: "Sin entrenamiento estructurado" }, { time: "Todo el día", a: "Come según el plan, sin saltarte comidas" }],
    notes: "Cocinar en batch ahorra tiempo y elimina decisiones en la semana." },
];

// ─── TRAINING BLOCKS ──────────────────────────────────────────
function getCurrentMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.getFullYear(), d.getMonth(), diff).toISOString().split("T")[0];
}

const TRAINING_BLOCKS = [
  {
    id: "push",
    label: "PUSH",
    subtitle: "Pecho · Hombros · Tríceps",
    day: "Lunes",
    color: "#c8440a",
    icon: "⬆️",
    exercises: [
      { id: "press_banca", name: "Press de Banca", equipment: "Barra", sets: "4", reps: "8–10", rest: "90 seg",
        muscles: ["Pecho mayor", "Tríceps", "Deltoides ant."],
        tips: ["Escápulas juntas y hundidas durante todo el movimiento", "Baja la barra controlado hasta rozar el pecho", "Codos a 45–60° del torso, nunca totalmente abiertos"],
        note: "El ejercicio rey del push. Prioriza técnica sobre peso." },
      { id: "press_inclinado", name: "Press Inclinado Mancuernas", equipment: "Mancuerna", sets: "3", reps: "10–12", rest: "75 seg",
        muscles: ["Pecho superior", "Deltoides ant."],
        tips: ["Banco a 30–45°, no más", "Mueve los codos en arco, no en línea recta", "Sube con potencia, baja controlando 2–3 seg"],
        note: "Trabaja el pecho superior que el press plano no alcanza bien." },
      { id: "press_militar", name: "Press Militar", equipment: "Barra / Mancuerna", sets: "4", reps: "8–10", rest: "90 seg",
        muscles: ["Deltoides", "Tríceps", "Trapecio sup."],
        tips: ["Core apretado, no arquees la espalda lumbar", "Empuja la barra en línea recta sobre la cabeza", "Codos ligeramente adelantados, no abiertos"],
        note: "Fundamental para hombros. Alternarlo barra/mancuerna cada semana." },
      { id: "elevaciones_lat", name: "Elevaciones Laterales", equipment: "Mancuerna", sets: "3", reps: "12–15", rest: "60 seg",
        muscles: ["Deltoides lateral"],
        tips: ["Codo ligeramente doblado, no recto", "Eleva hasta la altura del hombro, no más arriba", "Baja muy despacio — la excéntrica cuenta mucho aquí"],
        note: "Peso ligero, ejecución perfecta. Nada de impulso con el cuerpo." },
      { id: "fondos", name: "Fondos en Paralelas", equipment: "Peso corporal", sets: "3", reps: "Al fallo", rest: "90 seg",
        muscles: ["Tríceps", "Pecho inferior", "Deltoides ant."],
        tips: ["Inclínate ligeramente hacia delante para activar más pecho", "Baja hasta que los codos lleguen a 90°", "Si es demasiado fácil, añade lastre con cinturón"],
        note: "Excelente ejercicio compuesto final para fatigarlo todo." },
      { id: "tricep_polea", name: "Extensiones Tríceps Polea", equipment: "Máquina", sets: "3", reps: "12–15", rest: "60 seg",
        muscles: ["Tríceps (cabeza larga)"],
        tips: ["Codos pegados al cuerpo, inmóviles durante todo el recorrido", "Extiende completamente, aprieta el tríceps abajo", "Agarre en cuerda para mayor rango de movimiento"],
        note: "Aislamiento puro. Cierra el push con buena congestión." },
    ]
  },
  {
    id: "pull",
    label: "PULL",
    subtitle: "Espalda · Bíceps · Deltoides post.",
    day: "Miércoles",
    color: "#1a5c8a",
    icon: "⬇️",
    exercises: [
      { id: "dominadas", name: "Dominadas", equipment: "Peso corporal", sets: "4", reps: "Al fallo", rest: "120 seg",
        muscles: ["Dorsal ancho", "Bíceps", "Romboides"],
        tips: ["Agarre supino o prono según el objetivo (supino = más bíceps)", "Parte desde colgado muerto, escápulas activadas", "Sube el pecho hacia la barra, no la barbilla"],
        note: "El mejor ejercicio de espalda. Si no puedes hacer ninguna, usa banda elástica." },
      { id: "remo_barra", name: "Remo con Barra", equipment: "Barra", sets: "4", reps: "8–10", rest: "90 seg",
        muscles: ["Dorsal", "Trapecio", "Romboides", "Bíceps"],
        tips: ["Espalda recta con leve inclinación hacia delante (45°)", "Lleva la barra al ombligo, no al pecho", "Aprieta la espalda en la contracción — aguanta 1 seg"],
        note: "Movimiento compuesto clave. Uno de los mejores para masa de espalda." },
      { id: "jalon", name: "Jalón al Pecho Agarre Ancho", equipment: "Máquina", sets: "3", reps: "10–12", rest: "75 seg",
        muscles: ["Dorsal ancho", "Bíceps", "Teres mayor"],
        tips: ["Lleva la barra a la clavícula, no por detrás del cuello", "Inclínate ligeramente hacia atrás durante el movimiento", "Controla la subida — no dejes que la polea te tire"],
        note: "Excelente alternativa o complemento a las dominadas." },
      { id: "remo_polea", name: "Remo en Polea Baja", equipment: "Máquina", sets: "3", reps: "10–12", rest: "75 seg",
        muscles: ["Romboides", "Trapecio medio", "Dorsal"],
        tips: ["Siéntate erguido, no te desplomes hacia atrás con el impulso", "Lleva los codos lo más atrás posible", "Pausa en contracción máxima 1 segundo"],
        note: "Trabaja el centro de la espalda que el remo con barra no llega tan bien." },
      { id: "curl_biceps", name: "Curl de Bíceps con Barra", equipment: "Barra", sets: "3", reps: "10–12", rest: "60 seg",
        muscles: ["Bíceps braquial", "Braquial"],
        tips: ["Codos fijos a los costados durante todo el recorrido", "Sube hasta contracción máxima — aprieta arriba", "Baja lentamente en 2–3 segundos"],
        note: "La barra permite más carga que las mancuernas. Alterna con martillo." },
      { id: "face_pull", name: "Face Pull", equipment: "Máquina", sets: "3", reps: "15–20", rest: "60 seg",
        muscles: ["Deltoides post.", "Rotadores externos", "Trapecio"],
        tips: ["Polea a la altura de la cara", "Lleva las manos hacia las orejas, codos altos", "Movimiento lento y controlado, nada de inercia"],
        note: "Esencial para la salud de los hombros. No lo omitas nunca." },
    ]
  },
  {
    id: "fullbody",
    label: "FULL BODY",
    subtitle: "Cuerpo completo · Fuerza base",
    day: "Viernes",
    color: "#2d7a45",
    icon: "🔥",
    exercises: [
      { id: "sentadilla", name: "Sentadilla con Barra", equipment: "Barra", sets: "4", reps: "6–8", rest: "120 seg",
        muscles: ["Cuádriceps", "Glúteos", "Isquios", "Core"],
        tips: ["Pies a la anchura de los hombros, ligeramente hacia fuera", "Rodillas siguen la dirección de los pies al bajar", "Espalda neutra — el pecho mira al frente siempre"],
        note: "El ejercicio más completo que existe. Respeta siempre el peso y la técnica." },
      { id: "peso_muerto_rum", name: "Peso Muerto Rumano", equipment: "Barra", sets: "4", reps: "8", rest: "120 seg",
        muscles: ["Isquiotibiales", "Glúteos", "Espalda baja"],
        tips: ["Baja la barra deslizándola por las piernas, caderas hacia atrás", "Para cuando notes que los isquios están al límite de su extensión", "Aprieta los glúteos al subir, no hiperextiendas la espalda"],
        note: "Rumano > peso muerto convencional para aislar isquios y glúteos." },
      { id: "hip_thrust", name: "Hip Thrust con Barra", equipment: "Barra", sets: "3", reps: "12", rest: "90 seg",
        muscles: ["Glúteos", "Isquios", "Core"],
        tips: ["La barra descansa sobre las caderas con almohadilla", "Empuja con los talones, no con la punta del pie", "Aprieta al máximo arriba — aguanta 1 seg"],
        note: "Mejor ejercicio aislado para glúteos. No lo saltes." },
      { id: "press_militar_fb", name: "Press Militar Mancuernas", equipment: "Mancuerna", sets: "3", reps: "10", rest: "75 seg",
        muscles: ["Deltoides", "Tríceps"],
        tips: ["De pie o sentado — de pie activa más el core", "Mancuernas al nivel de los hombros antes de empujar", "Exhala en el empuje, inhala en la bajada"],
        note: "Hombros en el día de full body para mantener la frecuencia alta." },
      { id: "remo_mancuerna", name: "Remo Mancuerna 1 Brazo", equipment: "Mancuerna", sets: "3", reps: "10 c/lado", rest: "60 seg",
        muscles: ["Dorsal", "Romboides", "Bíceps"],
        tips: ["Apoya la rodilla y la mano libre en un banco", "Tira del codo hacia arriba y atrás, no solo hacia arriba", "Rango completo — baja hasta sentir el estiramiento"],
        note: "Unilateral: corrige desequilibrios entre lados. Pesa lo que necesites." },
      { id: "plancha", name: "Plancha Isométrica", equipment: "Peso corporal", sets: "3", reps: "45–60 seg", rest: "45 seg",
        muscles: ["Core", "Transverso abdom.", "Glúteos"],
        tips: ["Cuerpo en línea recta de cabeza a talones", "Aprieta el abdomen como si fuera a recibir un golpe", "Mira al suelo, no al frente"],
        note: "Cierra siempre el full body con core. La plancha es la base." },
    ]
  }
];

// ─── HABITS CONFIG ────────────────────────────────────────────

const DOS = [
  { icon: "⚖️", text: "Pesa toda la comida los primeros 14 días hasta calibrar las raciones visualmente." },
  { icon: "🥡", text: "Batch cooking dominical: prepara 4-5 tuppers de almuerzo y cena de golpe." },
  { icon: "💧", text: "Bebe 3-3.5L de agua al día. Añade 500ml extra cada hora de carrera." },
  { icon: "🥩", text: "Proteína en cada comida. Sin excepción. Mínimo 30g por toma." },
  { icon: "😴", text: "8 horas de sueño. Crucial para recuperación y control de cortisol en déficit." },
  { icon: "🍚", text: "Los días de carrera larga (sábado) añade 200-300 kcal en carbos al almuerzo." },
  { icon: "📊", text: "Pésate cada mañana en ayunas, registra la media semanal — no el dato diario." },
  { icon: "🧂", text: "Sal extra post-carrera larga: el sodio perdido en el sudor hay que reponerlo." },
];

const DONTS = [
  { icon: "🚫", text: "No bajes de 1.600 kcal los días de entrenamiento de running intenso." },
  { icon: "🚫", text: "No hagas ayuno antes de la carrera larga del sábado. Come siempre 90 min antes." },
  { icon: "🚫", text: "No elimines los carbos del todo. Tu cerebro y músculos los necesitan para correr." },
  { icon: "🚫", text: "No hagas más de 3 sesiones de alta intensidad a la semana — aumentas el cortisol." },
  { icon: "🚫", text: "Alcohol fuera. Bloquea la síntesis proteica y añade calorías vacías." },
  { icon: "🚫", text: "No añadas cardio extra si el cuerpo pide descanso. Contraproducente en déficit." },
  { icon: "🚫", text: "No te saltes el snack post-entreno. La ventana anabólica existe, aprovéchala." },
  { icon: "🚫", text: "No compensar un mal día comiendo menos al día siguiente. Vuelve al plan sin drama." },
];

const TABS = ["📋 Hábitos", "📆 Mi Plan", "🛒 Compra", "📅 Semana", "✅ Do & Don't", "🍽️ Recetas"];

// ─── HELPERS ──────────────────────────────────────────────────
function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function calcTDEE(weight, height, age, sex, activity, bodyfat) {
  let bmr;
  if (bodyfat && +bodyfat > 0 && +bodyfat < 50) {
    // Katch-McArdle: more accurate when body fat is known
    const lbm = weight * (1 - +bodyfat / 100);
    bmr = Math.round(370 + 21.6 * lbm);
  } else {
    // Mifflin-St Jeor: best general-purpose formula
    bmr = sex === "H"
      ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
      : Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }
  // Activity multipliers — tuned for fuerza + running combo
  const factors = {
    sedentary: 1.2,          // desk job, no exercise
    light: 1.375,             // 1-2 gym sessions/week
    moderate: 1.55,           // 3-4 sessions/week
    active: 1.725,            // daily training or fuerza+running combo
    very_active: 1.9,         // twice/day or heavy manual work
  };
  return Math.round(bmr * (factors[activity] || 1.55));
}

// ─── COMPONENTS ──────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: 18, marginBottom: 12, ...style }}>
      {children}
    </div>
  );
}

function Label({ children, color }) {
  return <div style={{ fontSize: 9, color: color || COLORS.muted, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{children}</div>;
}

// ─── HABITS TRACKER ───────────────────────────────────────────
// ─── CALORIE CALCULATOR ───────────────────────────────────────
const STEPS = ["datos", "actividad", "resultado"];

// ─── PLANNER CONSTANTS ───────────────────────────────────────
const DAYS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const SLOTS = [
  { key: "desayuno",  label: "Desayuno",      mealKey: "desayunos",    emoji: "☀️" },
  { key: "media_m",  label: "Media Mañana",   mealKey: "media_manana", emoji: "🍎" },
  { key: "almuerzo", label: "Almuerzo",        mealKey: "almuerzos",   emoji: "🍗" },
  { key: "pre",      label: "Pre-Entreno",     mealKey: "pre_entreno", emoji: "💪" },
  { key: "cena",     label: "Cena",            mealKey: "cenas",       emoji: "🌙" },
];

function getSundayKey() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  const sunday = new Date(d);
  sunday.setDate(d.getDate() + diff);
  return sunday.toISOString().split("T")[0];
}

function getPlannerWeekLabel() {
  const d = new Date();
  const day = d.getDay();
  const mon = new Date(d);
  mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (dt) => dt.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  return `${fmt(mon)} – ${fmt(sun)}`;
}

function kcalTier(kcal, cat) {
  const thresholds = {
    desayunos:   { low: 350, high: 460 },
    almuerzos:   { low: 500, high: 600 },
    cenas:       { low: 380, high: 480 },
    media_manana:{ low: 150, high: 280 },
    pre_entreno: { low: 220, high: 380 },
  };
  const t = thresholds[cat] || { low: 300, high: 500 };
  if (kcal <= t.low) return { label: "light", color: "#2d7a45", bg: "#f0f7f2" };
  if (kcal >= t.high) return { label: "alto", color: "#c8440a", bg: "#fff5f0" };
  return { label: "medio", color: "#c47a1a", bg: "#fffbf0" };
}

function findFullMeal(name) {
  for (const cat of Object.keys(meals)) {
    const found = meals[cat].find(m => m.name === name);
    if (found) return found;
  }
  // Also check custom meals in localStorage
  try {
    const custom = JSON.parse(localStorage.getItem("custom_meals") || "{}");
    for (const cat of Object.keys(custom)) {
      const found = custom[cat].find(m => m.name === name);
      if (found) return found;
    }
  } catch {}
  return null;
}

function MiPlanTab({ onUpdate, userTarget }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ weight: "", height: "", age: "", sex: "H", activity: "moderate", goal: "cut_aggressive", bodyfat: "" });
  const [saved, setSaved] = useState(null);
  // Planner state
  const [plan, setPlan] = useState({});
  const [activeDay, setActiveDay] = useState("LUN");
  const [picker, setPicker] = useState(null);
  const [exported, setExported] = useState(false);
  const [mealDetail, setMealDetail] = useState(null); // { meal object }
  const [planLoaded, setPlanLoaded] = useState(false);
  const sundayKey = getSundayKey();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user_calc");
      if (raw) { const d = JSON.parse(raw); setSaved(d); onUpdate && onUpdate(d); }
    } catch {}
    try {
      const raw = localStorage.getItem("meal_plan");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.sunday === sundayKey) setPlan(d.plan || {});
        else localStorage.setItem("meal_plan", JSON.stringify({ sunday: sundayKey, plan: {} }));
      }
    } catch {}
    setPlanLoaded(true);
  }, []);

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function saveMeta(result) {
    try { localStorage.setItem("user_calc", JSON.stringify(result)); } catch {}
    setSaved(result);
    onUpdate && onUpdate(result);
  }

  function compute() {
    const tdee = calcTDEE(+form.weight, +form.height, +form.age, form.sex, form.activity, form.bodyfat);
    const deficits = { cut_aggressive: 700, cut_moderate: 400 };
    const deficit = deficits[form.goal] || 700;
    const target = tdee - deficit;
    const protein = Math.round(form.weight * 2.2);
    const result = { ...form, tdee, target, protein, deficit, weightLoss: (deficit * 7 / 7700).toFixed(2), formula: (form.bodyfat && +form.bodyfat > 0) ? 'Katch-McArdle' : 'Mifflin-St Jeor' };
    saveMeta(result);
    setStep(0);
  }

  function savePlan(next) {
    setPlan(next);
    try { localStorage.setItem("meal_plan", JSON.stringify({ sunday: sundayKey, plan: next })); } catch {}
  }

  function selectMeal(day, slotKey, meal) {
    const next = { ...plan, [day]: { ...(plan[day] || {}), [slotKey]: { name: meal.name, emoji: meal.emoji, kcal: meal.macros.kcal, prot: meal.macros.prot, carb: meal.macros.carb, fat: meal.macros.fat, ingredients: meal.ingredients, prep: meal.prep } } };
    savePlan(next);
    setPicker(null);
  }

  function clearSlot(day, slotKey) { savePlan({ ...plan, [day]: { ...(plan[day] || {}), [slotKey]: null } }); }
  function clearDay(day) { savePlan({ ...plan, [day]: {} }); }
  function dayKcal(day) { return Object.values(plan[day] || {}).reduce((s, m) => s + (m?.kcal || 0), 0); }
  function totalKcalWeek() { return DAYS.reduce((s, d) => s + dayKcal(d), 0); }

  function exportToShop() {
    const plannedIngredients = new Set();
    // Clean an ingredient string down to its core noun(s)
    function cleanIng(raw) {
      return raw.toLowerCase()
        .replace(/→.*$/g, '')
        .replace(/\d+[gml]+/g, '')
        .replace(/\(.*?\)/g, '')
        .replace(/^\d+\s*/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
    DAYS.forEach(day => {
      Object.values(plan[day] || {}).forEach(meal => {
        if (!meal?.ingredients) return;
        meal.ingredients.forEach(rawIng => {
          const cleaned = cleanIng(rawIng);
          // Split comma-separated combos ("ajo, jengibre, soja")
          const parts = cleaned.split(/[,+·]/).map(p => p.trim()).filter(p => p.length > 2);
          parts.forEach(part => {
            // 1. Exact match
            let match = SHOP_ITEMS.find(si => si.name.toLowerCase() === part);
            // 2. Shop item name is contained in the ingredient
            if (!match) match = SHOP_ITEMS.find(si => {
              const sn = si.name.toLowerCase();
              return part.includes(sn) && sn.length > 4;
            });
            // 3. Ingredient is contained in shop item name
            if (!match) match = SHOP_ITEMS.find(si => {
              const sn = si.name.toLowerCase();
              return sn.includes(part) && part.length > 5;
            });
            // 4. First meaningful word match (min 5 chars, skip generic words)
            if (!match) {
              const stopWords = new Set(['spray', 'light', 'fresco', 'natural', 'seco', 'cocido', 'entero', 'cruda', 'puro', 'molido', 'desnatada']);
              const words = part.split(' ').filter(w => w.length >= 5 && !stopWords.has(w));
              match = SHOP_ITEMS.find(si => words.some(w => si.name.toLowerCase().includes(w)));
            }
            if (match) plannedIngredients.add(match.name);
          });
        });
      });
    });
    try {
      const raw = localStorage.getItem("shop_list");
      const d = raw ? JSON.parse(raw) : { checked: {}, custom: [] };
      const existingCheckedNames = new Set(
        Object.keys(d.checked || {}).map(k => {
          const idx = parseInt(k.replace('shop_', ''));
          return SHOP_ITEMS[idx]?.name;
        }).filter(Boolean)
      );
      const existingCustomNames = new Set((d.custom || []).map(i => i.name));
      const toAdd = [...plannedIngredients].filter(n => !existingCheckedNames.has(n) && !existingCustomNames.has(n));
      // Mark them as checked in shop list
      const nextChecked = { ...d.checked };
      toAdd.forEach(name => {
        const idx = SHOP_ITEMS.findIndex(si => si.name === name);
        if (idx >= 0) nextChecked[`shop_${idx}`] = true;
      });
      d.checked = nextChecked;
      localStorage.setItem("shop_list", JSON.stringify(d));
      setExported(true);
      setTimeout(() => setExported(false), 2500);
    } catch {}
  }

  const TARGET = userTarget || 1700;
  const dayKcalVal = dayKcal(activeDay);

  const inputStyle = { width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", color: COLORS.text, boxSizing: "border-box" };
  const btnStyle = { background: COLORS.accent, color: "#fff", border: "none", borderRadius: 6, padding: "11px 24px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic" };

  // ── CALC SECTION (top, compact if saved) ──
  const calcSection = saved && step === 0 ? (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ fontSize: 9, color: COLORS.green, letterSpacing: 2 }}>TU PLAN ACTIVO · {saved.formula || 'Mifflin-St Jeor'}</div>
        <button onClick={() => { setForm(f => ({ ...f, weight: saved.weight||"", height: saved.height||"", age: saved.age||"", sex: saved.sex||"H", activity: saved.activity||"moderate", goal: saved.goal||"cut_aggressive", bodyfat: saved.bodyfat||"" })); setSaved(null); setStep(0); }} style={{ fontSize: 10, background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: "3px 10px", color: COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>Recalcular</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
        {[
          { l: "TDEE", v: `${saved.tdee}`, unit: "kcal", c: COLORS.muted },
          { l: "OBJETIVO", v: `${saved.target}`, unit: "kcal", c: COLORS.accent },
          { l: "PROTEÍNA", v: `${saved.protein}g`, unit: "mín.", c: COLORS.green },
          { l: "PÉRDIDA", v: `~${saved.weightLoss}`, unit: "kg/sem", c: COLORS.orange },
        ].map(x => (
          <div key={x.l} style={{ background: COLORS.bg, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 8, color: COLORS.muted, letterSpacing: 1.5 }}>{x.l}</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: x.c, marginTop: 3, lineHeight: 1 }}>{x.v}</div>
            <div style={{ fontSize: 8, color: COLORS.muted, marginTop: 2 }}>{x.unit}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Descanso", kcal: Math.round(saved.target - 150), d: "Vie, Dom", c: COLORS.muted },
          { l: "Entreno", kcal: saved.target, d: "Lun, Mar, Jue", c: COLORS.blue },
          { l: "Carga", kcal: Math.round(saved.target + 200), d: "Mié, Sáb", c: COLORS.accent },
        ].map(x => (
          <div key={x.l} style={{ borderLeft: `3px solid ${x.c}`, paddingLeft: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: x.c }}>{x.kcal}</div>
            <div style={{ fontSize: 8, color: COLORS.muted, letterSpacing: 1 }}>KCAL</div>
            <div style={{ fontSize: 10, color: COLORS.text, marginTop: 4, fontStyle: "italic" }}>{x.l}</div>
            <div style={{ fontSize: 9, color: COLORS.muted }}>{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  ) : step === 0 ? (
    <Card>
      <Label>Calcula tu plan personalizado</Label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div><div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Peso (kg)</div><input style={inputStyle} type="number" value={form.weight} onChange={e => setF("weight", e.target.value)} placeholder="ej. 82" /></div>
        <div><div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Altura (cm)</div><input style={inputStyle} type="number" value={form.height} onChange={e => setF("height", e.target.value)} placeholder="ej. 178" /></div>
        <div><div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Edad</div><input style={inputStyle} type="number" value={form.age} onChange={e => setF("age", e.target.value)} placeholder="ej. 30" /></div>
        <div><div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Sexo</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["H","Hombre"],["M","Mujer"]].map(([v,l]) => (
              <button key={v} onClick={() => setF("sex", v)} style={{ flex: 1, padding: "10px 0", borderRadius: 6, border: `1px solid ${form.sex===v?COLORS.accent:COLORS.cardBorder}`, background: form.sex===v?COLORS.accent:COLORS.bg, color: form.sex===v?"#fff":COLORS.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontStyle: "italic" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 6 }}>% Grasa corporal <span style={{ color: COLORS.accent }}>(opcional)</span></div>
        <input style={inputStyle} type="number" min="5" max="45" value={form.bodyfat} onChange={e => setF("bodyfat", e.target.value)} placeholder="ej. 18 (si lo sabes)" />
        <div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic", marginTop: 6 }}>
          Si lo introduces se usa la fórmula <strong>Katch-McArdle</strong> (más precisa para atletas). Si no, se usa <strong>Mifflin-St Jeor</strong>.
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <button style={btnStyle} onClick={() => form.weight && form.height && form.age && setStep(1)}>Siguiente →</button>
      </div>
    </Card>
  ) : (
    <Card>
      <Label>Nivel de actividad y objetivo</Label>
      <div style={{ marginBottom: 12 }}>
        {[
          ["sedentary","Sedentario","Escritorio, sin ejercicio regular"],
          ["light","Ligero","1-2 sesiones suaves por semana"],
          ["moderate","Moderado","3-4 sesiones: gym o running alternados"],
          ["active","Activo","Fuerza 3x + running 3-4x semanal ← tu caso"],
          ["very_active","Muy activo","Dobles sesiones o trabajo físico intenso"]
        ].map(([v,l,d]) => (
          <button key={v} onClick={() => setF("activity", v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", marginBottom: 6, borderRadius: 6, border: `1px solid ${form.activity===v?COLORS.accent:COLORS.cardBorder}`, background: form.activity===v?"#fff5f2":COLORS.bg, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${form.activity===v?COLORS.accent:COLORS.cardBorder}`, background: form.activity===v?COLORS.accent:"transparent", flexShrink: 0 }} />
            <div><div style={{ fontSize: 12, color: COLORS.text, fontWeight: form.activity===v?700:400 }}>{l}</div><div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic" }}>{d}</div></div>
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        {[["cut_aggressive","Corte agresivo −700 kcal","~0.8-1 kg/sem"],["cut_moderate","Corte moderado −400 kcal","~0.4-0.5 kg/sem"]].map(([v,l,d]) => (
          <button key={v} onClick={() => setF("goal", v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", marginBottom: 6, borderRadius: 6, border: `1px solid ${form.goal===v?COLORS.accent:COLORS.cardBorder}`, background: form.goal===v?"#fff5f2":COLORS.bg, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${form.goal===v?COLORS.accent:COLORS.cardBorder}`, background: form.goal===v?COLORS.accent:"transparent", flexShrink: 0 }} />
            <div><div style={{ fontSize: 12, color: COLORS.text, fontWeight: form.goal===v?700:400 }}>{l}</div><div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic" }}>{d}</div></div>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ ...btnStyle, background: COLORS.bg, color: COLORS.muted, border: `1px solid ${COLORS.cardBorder}` }} onClick={() => setStep(0)}>← Atrás</button>
        <button style={btnStyle} onClick={compute}>Calcular →</button>
      </div>
    </Card>
  );

  if (!planLoaded) return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontStyle: "italic" }}>Cargando...</div>;

  return (
    <div>
      {calcSection}

      {/* ── PLANNER ── */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 3 }}>PLANIFICADOR SEMANAL</div>
          <div style={{ fontSize: 12, color: COLORS.text }}>{getPlannerWeekLabel()}</div>
          {totalKcalWeek() > 0 && <div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic", marginTop: 2 }}>{totalKcalWeek().toLocaleString("es-ES")} kcal planificadas</div>}
        </div>
        <button onClick={exportToShop}
          style={{ background: exported ? COLORS.green : COLORS.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", fontWeight: 700, transition: "background 0.3s" }}>
          {exported ? "✓ Añadido!" : "🛒 Exportar a compra"}
        </button>
      </div>

      {/* Day pills */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14, overflowX: "auto" }}>
        {DAYS.map((day, i) => {
          const kcal = dayKcal(day);
          const pct = Math.min(100, (kcal / TARGET) * 100);
          const isActive = activeDay === day;
          const col = kcal === 0 ? COLORS.cardBorder : kcal > TARGET * 1.1 ? COLORS.red : kcal >= TARGET * 0.85 ? COLORS.green : COLORS.orange;
          return (
            <button key={day} onClick={() => setActiveDay(day)}
              style={{ flex: 1, minWidth: 42, background: isActive ? COLORS.accent : COLORS.card, border: `1px solid ${isActive ? COLORS.accent : COLORS.cardBorder}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: isActive ? "#fff" : COLORS.muted, marginBottom: 4 }}>{day}</div>
              <div style={{ background: isActive ? "rgba(255,255,255,0.2)" : COLORS.bg, borderRadius: 4, height: 28, display: "flex", alignItems: "flex-end", overflow: "hidden", margin: "0 4px" }}>
                <div style={{ width: "100%", background: isActive ? "rgba(255,255,255,0.6)" : col, height: `${Math.max(4, pct)}%`, borderRadius: 2, transition: "height 0.4s" }} />
              </div>
              <div style={{ fontSize: 9, color: isActive ? "rgba(255,255,255,0.85)" : COLORS.muted, marginTop: 3 }}>{kcal > 0 ? kcal : "—"}</div>
            </button>
          );
        })}
      </div>

      {/* Day detail card */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ background: COLORS.accent, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{DAY_NAMES[DAYS.indexOf(activeDay)]}</span>
            {dayKcalVal > 0 && <span style={{ marginLeft: 10, fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{dayKcalVal} kcal · {Math.round(Object.values(plan[activeDay] || {}).reduce((s, m) => s + (m?.prot || 0), 0))}g prot</span>}
          </div>
          {dayKcalVal > 0 && (
            <button onClick={() => clearDay(activeDay)} style={{ fontSize: 10, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "4px 10px", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Borrar día ×</button>
          )}
        </div>
        {dayKcalVal > 0 && (
          <div style={{ padding: "8px 16px 0" }}>
            <div style={{ background: COLORS.bg, borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, (dayKcalVal / TARGET) * 100)}%`, height: 5, background: dayKcalVal > TARGET * 1.1 ? COLORS.red : dayKcalVal >= TARGET * 0.85 ? COLORS.green : COLORS.orange, borderRadius: 4, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 9, color: COLORS.muted, marginTop: 3, marginBottom: 6, textAlign: "right" }}>
              {dayKcalVal > TARGET ? `+${dayKcalVal - TARGET} sobre objetivo` : `${TARGET - dayKcalVal} kcal restantes`}
            </div>
          </div>
        )}
        {SLOTS.map((slot, si) => {
          const meal = plan[activeDay]?.[slot.key];
          return (
            <div key={slot.key} style={{ borderTop: si > 0 ? `1px solid ${COLORS.cardBorder}` : "none", padding: "11px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{slot.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, marginBottom: 2 }}>{slot.label.toUpperCase()}</div>
                    {meal ? (
                      <button onClick={() => {
                          const full = findFullMeal(meal.name);
                          setMealDetail(full ? { ...meal, ingredients: full.ingredients, prep: full.prep } : meal);
                        }}
                        style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
                        <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{meal.emoji} {meal.name}</div>
                        <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
                          {meal.kcal} kcal · {meal.prot}g P · {meal.carb}g C · {meal.fat}g G
                          <span style={{ marginLeft: 8, color: COLORS.accent }}>ver receta ›</span>
                        </div>
                      </button>
                    ) : (
                      <div style={{ fontSize: 12, color: COLORS.muted, fontStyle: "italic" }}>Sin planificar</div>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {meal && <button onClick={() => clearSlot(activeDay, slot.key)} style={{ background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "5px 8px", fontSize: 11, color: COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>×</button>}
                  <button onClick={() => setPicker({ day: activeDay, slotKey: slot.key, mealKey: slot.mealKey, label: slot.label })}
                    style={{ background: COLORS.accent, border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", fontWeight: 700 }}>
                    {meal ? "Cambiar" : "+ Elegir"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MEAL DETAIL MODAL */}
      {mealDetail && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          onClick={() => setMealDetail(null)}>
          <div style={{ background: COLORS.bg, borderRadius: "18px 18px 0 0", width: "100%", maxHeight: "82vh", display: "flex", flexDirection: "column" }}
            onClick={e => e.stopPropagation()}>
            {/* Handle bar */}
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: COLORS.cardBorder }} />
            </div>
            {/* Header */}
            <div style={{ padding: "8px 20px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 30 }}>{mealDetail.emoji}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, lineHeight: 1.2 }}>{mealDetail.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4, display: "flex", gap: 10 }}>
                    <span style={{ fontWeight: 700, color: COLORS.accent }}>{mealDetail.kcal} kcal</span>
                    <span>{mealDetail.prot}g P</span>
                    <span>{mealDetail.carb}g C</span>
                    <span>{mealDetail.fat}g G</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setMealDetail(null)}
                style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.cardBorder, border: "none", cursor: "pointer", fontSize: 16, color: COLORS.muted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
            </div>
            {/* Scrollable body */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 32px", WebkitOverflowScrolling: "touch" }}>
              {(mealDetail.ingredients || []).length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>INGREDIENTES</div>
                  <div style={{ background: COLORS.card, borderRadius: 10, overflow: "hidden" }}>
                    {(mealDetail.ingredients || []).map((ing, i, arr) => (
                      <div key={i} style={{ fontSize: 13, color: COLORS.text, padding: "9px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.cardBorder}` : "none", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: COLORS.accent, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>{ing}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {mealDetail.prep && (
                <div style={{ background: COLORS.card, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>PREPARACIÓN</div>
                  <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8, fontStyle: "italic" }}>{mealDetail.prep}</div>
                </div>
              )}
              {!mealDetail.prep && !mealDetail.ingredients?.length && (
                <div style={{ textAlign: "center", padding: 30, color: COLORS.muted, fontStyle: "italic", fontSize: 13 }}>
                  Planifica esta comida de nuevo para ver los detalles completos
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PICKER MODAL */}
      {picker && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          onClick={(e) => e.target === e.currentTarget && setPicker(null)}>
          <div style={{ background: COLORS.bg, borderRadius: "16px 16px 0 0", width: "100%", maxWidth: 720, maxHeight: "75vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 20px 12px", background: COLORS.card, borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2 }}>ELEGIR PARA</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginTop: 2 }}>{picker.label} · {DAY_NAMES[DAYS.indexOf(picker.day)]}</div>
              </div>
              <button onClick={() => setPicker(null)} style={{ background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", color: COLORS.muted, fontFamily: "inherit" }}>Cerrar</button>
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px" }}>
              {[...(meals[picker.mealKey] || []), ...(JSON.parse(localStorage.getItem("custom_meals") || "{}")[picker.mealKey] || [])].map((meal, i) => (
                <button key={i} onClick={() => selectMeal(picker.day, picker.slotKey, meal)}
                  style={{ width: "100%", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{meal.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{meal.name}</div>
                      {(() => { const t = kcalTier(meal.macros.kcal, picker.mealKey); return <span style={{ fontSize: 9, background: t.bg, color: t.color, padding: "1px 6px", borderRadius: 10, fontWeight: 700 }}>{t.label}</span>; })()}
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>{meal.macros.kcal} kcal · {meal.macros.prot}g prot{meal.tupper ? " · 📦" : ""}</div>
                  </div>
                  <span style={{ fontSize: 18, color: COLORS.accent }}>›</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── SHOPPING LIST ────────────────────────────────────────────
const SHOP_ITEMS = [
  { name: "Pechuga de pollo", cat: "Proteínas" },
  { name: "Muslo de pollo sin piel", cat: "Proteínas" },
  { name: "Ternera magra", cat: "Proteínas" },
  { name: "Ternera picada magra 5%", cat: "Proteínas" },
  { name: "Carne picada magra 5%", cat: "Proteínas" },
  { name: "Salmón fresco", cat: "Proteínas" },
  { name: "Salmón ahumado", cat: "Proteínas" },
  { name: "Atún al natural (bote)", cat: "Proteínas" },
  { name: "Gambas peladas", cat: "Proteínas" },
  { name: "Huevos", cat: "Proteínas" },
  { name: "Claras de huevo", cat: "Proteínas" },
  { name: "Jamón serrano", cat: "Proteínas" },
  { name: "Jamón ibérico", cat: "Proteínas" },
  { name: "Proteína whey", cat: "Proteínas" },
  { name: "Requesón / Cottage 0%", cat: "Proteínas" },
  { name: "Yogurt griego 0%", cat: "Lácteos" },
  { name: "Skyr natural", cat: "Lácteos" },
  { name: "Leche desnatada", cat: "Lácteos" },
  { name: "Queso fresco batido 0%", cat: "Lácteos" },
  { name: "Mozzarella light", cat: "Lácteos" },
  { name: "Avena en copos", cat: "Carbohidratos" },
  { name: "Arroz basmati", cat: "Carbohidratos" },
  { name: "Arroz integral", cat: "Carbohidratos" },
  { name: "Arroz jazmín", cat: "Carbohidratos" },
  { name: "Arroz blanco", cat: "Carbohidratos" },
  { name: "Quinoa", cat: "Carbohidratos" },
  { name: "Cuscús", cat: "Carbohidratos" },
  { name: "Fideos integrales", cat: "Carbohidratos" },
  { name: "Patata", cat: "Carbohidratos" },
  { name: "Boniato", cat: "Carbohidratos" },
  { name: "Pan de centeno", cat: "Carbohidratos" },
  { name: "Pan integral", cat: "Carbohidratos" },
  { name: "Tortitas de arroz", cat: "Carbohidratos" },
  { name: "Granola sin azúcar", cat: "Carbohidratos" },
  { name: "Dátiles", cat: "Carbohidratos" },
  { name: "Brócoli", cat: "Frutas y Verduras" },
  { name: "Espinacas frescas", cat: "Frutas y Verduras" },
  { name: "Calabacín", cat: "Frutas y Verduras" },
  { name: "Berenjena", cat: "Frutas y Verduras" },
  { name: "Champiñones", cat: "Frutas y Verduras" },
  { name: "Zanahoria", cat: "Frutas y Verduras" },
  { name: "Cebolla", cat: "Frutas y Verduras" },
  { name: "Tomate cherry", cat: "Frutas y Verduras" },
  { name: "Tomate triturado (bote)", cat: "Frutas y Verduras" },
  { name: "Pepino", cat: "Frutas y Verduras" },
  { name: "Lechuga", cat: "Frutas y Verduras" },
  { name: "Espárragos trigueros", cat: "Frutas y Verduras" },
  { name: "Coliflor", cat: "Frutas y Verduras" },
  { name: "Edamame (congelado)", cat: "Frutas y Verduras" },
  { name: "Calabaza", cat: "Frutas y Verduras" },
  { name: "Aguacate", cat: "Frutas y Verduras" },
  { name: "Plátano", cat: "Frutas y Verduras" },
  { name: "Fresas", cat: "Frutas y Verduras" },
  { name: "Arándanos", cat: "Frutas y Verduras" },
  { name: "Arándanos secos", cat: "Frutas y Verduras" },
  { name: "Manzana", cat: "Frutas y Verduras" },
  { name: "Mandarina", cat: "Frutas y Verduras" },
  { name: "Mango", cat: "Frutas y Verduras" },
  { name: "Frutos rojos (congelados)", cat: "Frutas y Verduras" },
  { name: "Fruta de temporada", cat: "Frutas y Verduras" },
  { name: "Almendras", cat: "Frutos Secos" },
  { name: "Nueces", cat: "Frutos Secos" },
  { name: "Crema de cacahuete natural", cat: "Frutos Secos" },
  { name: "Semillas de chía", cat: "Frutos Secos" },
  { name: "Aceite de oliva (AOVE)", cat: "Condimentos y Extras" },
  { name: "Miel", cat: "Condimentos y Extras" },
  { name: "Cacao puro sin azúcar", cat: "Condimentos y Extras" },
  { name: "Canela molida", cat: "Condimentos y Extras" },
  { name: "Mostaza de Dijon", cat: "Condimentos y Extras" },
  { name: "Salsa de soja light", cat: "Condimentos y Extras" },
  { name: "Salsa teriyaki light", cat: "Condimentos y Extras" },
  { name: "Pesto ligero (bote)", cat: "Condimentos y Extras" },
  { name: "Ajo (cabeza)", cat: "Condimentos y Extras" },
  { name: "Jengibre fresco", cat: "Condimentos y Extras" },
  { name: "Caldo de pollo bajo en sal", cat: "Condimentos y Extras" },
  { name: "Agua de coco", cat: "Condimentos y Extras" },
  { name: "Curry en polvo", cat: "Condimentos y Extras" },
  { name: "Cúrcuma", cat: "Condimentos y Extras" },
  { name: "Pimentón dulce/ahumado", cat: "Condimentos y Extras" },
  { name: "Comino molido", cat: "Condimentos y Extras" },
  { name: "Orégano seco", cat: "Condimentos y Extras" },
  { name: "Eneldo seco", cat: "Condimentos y Extras" },
  { name: "Hierbas provenzales", cat: "Condimentos y Extras" },
  { name: "Romero seco", cat: "Condimentos y Extras" },
  { name: "Tomillo seco", cat: "Condimentos y Extras" },
  { name: "Sésamo", cat: "Condimentos y Extras" },
  { name: "Extracto de vainilla", cat: "Condimentos y Extras" },
  { name: "Parmesano rallado", cat: "Lácteos" },
  { name: "Pasta integral", cat: "Carbohidratos" },
  { name: "Tortilla integral grande", cat: "Carbohidratos" },
  { name: "Pan brioche integral", cat: "Carbohidratos" },
  { name: "Espresso / café", cat: "Condimentos y Extras" },
  { name: "Perejil fresco", cat: "Condimentos y Extras" },
  { name: "Levadura en polvo", cat: "Condimentos y Extras" },
  { name: "Tahini", cat: "Condimentos y Extras" },
  { name: "Edulcorante", cat: "Condimentos y Extras" },
];

const CAT_ICONS = {
  "Proteínas": "🥩",
  "Lácteos": "🥛",
  "Carbohidratos": "🍚",
  "Frutas y Verduras": "🥦",
  "Frutos Secos": "🥜",
  "Condimentos y Extras": "🧂",
};

const CAT_COLORS = {
  "Proteínas": "#c8440a",
  "Lácteos": "#1a5c8a",
  "Carbohidratos": "#c47a1a",
  "Frutas y Verduras": "#2d7a45",
  "Frutos Secos": "#7c5cbf",
  "Condimentos y Extras": "#8a7f72",
};

function ShoppingTab() {
  const [checked, setChecked] = useState({});
  const [search, setSearch] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("shop_list");
      if (raw) {
        const d = JSON.parse(raw);
        setChecked(d.checked || {});
        setCustomItems(d.custom || []);
      }
    } catch {}
    setLoaded(true);
  }, []);

  function persist(nextChecked, nextCustom) {
    try { localStorage.setItem("shop_list", JSON.stringify({ checked: nextChecked, custom: nextCustom })); } catch {}
  }

  function toggleItem(key) {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    persist(next, customItems);
  }

  function addCustom() {
    const val = customInput.trim();
    if (!val) return;
    const next = [...customItems, { name: val, cat: "Mis añadidos" }];
    setCustomItems(next);
    setCustomInput("");
    persist(checked, next);
  }

  function removeCustom(idx) {
    const next = customItems.filter((_, i) => i !== idx);
    const nextChecked = { ...checked };
    delete nextChecked[`custom_${idx}`];
    setChecked(nextChecked);
    setCustomItems(next);
    persist(nextChecked, next);
  }

  function clearChecked() {
    const next = {};
    setChecked(next);
    persist(next, customItems);
  }

  const allItems = [
    ...SHOP_ITEMS.map((it, i) => ({ ...it, key: `shop_${i}` })),
    ...customItems.map((it, i) => ({ ...it, cat: "Mis añadidos", key: `custom_${i}` })),
  ];

  const checkedItems = allItems.filter(it => checked[it.key]);

  // Group checked items by category
  const checkedGrouped = {};
  checkedItems.forEach(it => {
    if (!checkedGrouped[it.cat]) checkedGrouped[it.cat] = [];
    checkedGrouped[it.cat].push(it);
  });

  const cats = ["Todos", "Proteínas", "Lácteos", "Carbohidratos", "Frutas y Verduras", "Frutos Secos", "Condimentos y Extras", "Mis añadidos"];
  const catOrder = ["Mis añadidos", "Proteínas", "Lácteos", "Carbohidratos", "Frutas y Verduras", "Frutos Secos", "Condimentos y Extras"];

  const filtered = allItems.filter(it => {
    const matchSearch = it.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeFilter === "Todos" || it.cat === activeFilter;
    return matchSearch && matchCat && !checked[it.key];
  });

  const grouped = {};
  filtered.forEach(it => {
    if (!grouped[it.cat]) grouped[it.cat] = [];
    grouped[it.cat].push(it);
  });

  if (!loaded) return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontStyle: "italic" }}>Cargando...</div>;

  return (
    <div>
      {/* ── CART: proper grouped list ── */}
      {checkedItems.length > 0 && (
        <div style={{ background: COLORS.card, border: `2px solid ${COLORS.green}`, borderRadius: 12, marginBottom: 20, overflow: "hidden" }}>
          {/* Cart header */}
          <div style={{ background: COLORS.green, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🛒</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}>Lista de compra</span>
              <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 20, fontSize: 11, color: "#fff", padding: "2px 8px", fontWeight: 700 }}>{checkedItems.length}</span>
            </div>
            <button onClick={clearChecked}
              style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 20, padding: "4px 12px", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
              Vaciar ×
            </button>
          </div>
          {/* Cart grouped by cat */}
          {catOrder.map(cat => {
            const items = checkedGrouped[cat];
            if (!items || items.length === 0) return null;
            const color = CAT_COLORS[cat] || COLORS.accent;
            return (
              <div key={cat}>
                <div style={{ padding: "8px 16px 4px", background: color + "10", borderBottom: `1px solid ${color}20` }}>
                  <span style={{ fontSize: 9, color: color, letterSpacing: 2, fontWeight: 700 }}>{CAT_ICONS[cat]} {cat.toUpperCase()}</span>
                </div>
                {items.map((it, idx) => (
                  <div key={it.key} onClick={() => toggleItem(it.key)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                      borderBottom: `1px solid ${COLORS.cardBorder}`, cursor: "pointer",
                      background: "#fff" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#fff", fontSize: 11, fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 13, color: COLORS.text, flex: 1 }}>{it.name}</span>
                    <span style={{ fontSize: 11, color: COLORS.muted }}>quitar ×</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* ── SEARCH ── */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: COLORS.muted, pointerEvents: "none" }}>🔍</span>
        <input
          type="text"
          placeholder="Buscar ingrediente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 8, padding: "11px 12px 11px 36px", fontSize: 14, fontFamily: "inherit",
            color: COLORS.text, boxSizing: "border-box" }}
        />
        {search && (
          <button onClick={() => setSearch("")}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: COLORS.muted, fontSize: 18 }}>×</button>
        )}
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {cats.map(cat => {
          const isActive = activeFilter === cat;
          const color = CAT_COLORS[cat] || COLORS.accent;
          return (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              style={{ background: isActive ? color : COLORS.card, color: isActive ? "#fff" : COLORS.muted,
                border: `1px solid ${isActive ? color : COLORS.cardBorder}`, borderRadius: 20,
                padding: "5px 12px", fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.15s" }}>
              {CAT_ICONS[cat] || "✨"} {cat}
            </button>
          );
        })}
      </div>

      {/* ── ADD CUSTOM ── */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
        <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>AÑADIR PRODUCTO</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="ej. Leche de avena, proteína vegana..."
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addCustom()}
            style={{ flex: 1, background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6,
              padding: "9px 12px", fontSize: 13, fontFamily: "inherit", color: COLORS.text }}
          />
          <button onClick={addCustom}
            style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 6,
              padding: "9px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
            + Añadir
          </button>
        </div>
      </div>

      {search && (
        <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic", marginBottom: 12 }}>
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para "{search}"
        </div>
      )}

      {/* ── INGREDIENT LIST ── */}
      {catOrder.map(cat => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        const color = CAT_COLORS[cat] || COLORS.accent;
        return (
          <div key={cat} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{CAT_ICONS[cat] || "✨"}</span>
              <span style={{ fontSize: 10, color: color, letterSpacing: 2, fontWeight: 700 }}>{cat.toUpperCase()}</span>
              <span style={{ fontSize: 10, color: COLORS.muted }}>({items.length})</span>
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, overflow: "hidden" }}>
              {items.map((it, idx) => (
                <div key={it.key} onClick={() => toggleItem(it.key)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                    borderBottom: idx < items.length - 1 ? `1px solid ${COLORS.cardBorder}` : "none",
                    cursor: "pointer" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${color}50`,
                    background: "transparent", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: COLORS.text, flex: 1 }}>{it.name}</span>
                  {it.cat === "Mis añadidos" && (
                    <button onClick={e => { e.stopPropagation(); removeCustom(customItems.findIndex(c => c.name === it.name)); }}
                      style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 16, padding: 0 }}>×</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && checkedItems.length > 0 && !search && (
        <div style={{ textAlign: "center", padding: 32, color: COLORS.muted, fontStyle: "italic" }}>
          ✅ Todo en el carrito
        </div>
      )}
      {filtered.length === 0 && search && (
        <div style={{ textAlign: "center", padding: 32, color: COLORS.muted, fontStyle: "italic" }}>
          Sin resultados para "{search}"
        </div>
      )}
    </div>
  );
}


// ─── WEEK TAB (Horario + Entrenamientos) ─────────────────────
function WeekTab() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedEx, setExpandedEx] = useState({});
  const [done, setDone] = useState({});
  const [activeBlock, setActiveBlock] = useState("push");
  const currentMonday = getCurrentMonday();

  const weekPlan = [
    { day: "LUN", name: "Push 💪 + Running (entrenador)", color: COLORS.blue,
      blocks: [{ time: "7:00", a: "Desayuno con proteína y carbos" }, { time: "9:00", a: "Sesión PUSH — ver bloques abajo" }, { time: "14:00", a: "Almuerzo — comida más grande del día" }, { time: "19:00", a: "Cena ligera + snack proteico" }],
      notes: "Día de carbos: arroz o patata en el almuerzo." },
    { day: "MAR", name: "Running (entrenador)", color: COLORS.muted,
      blocks: [{ time: "7:00", a: "Desayuno con carbos" }, { time: "Según entrena.", a: "Running según plan de tu entrenador" }, { time: "14:00", a: "Almuerzo tupper" }, { time: "19:00", a: "Cena ligera" }],
      notes: "Come antes del running. Snack proteico post-entreno." },
    { day: "MIÉ", name: "Pull 🏋️ + Running (entrenador)", color: COLORS.blue,
      blocks: [{ time: "9:00", a: "Sesión PULL — ver bloques abajo" }, { time: "14:00", a: "Almuerzo con carbos (quinoa/arroz)" }, { time: "19:00", a: "Cena proteica ligera" }],
      notes: "Día de carga: +150-200 kcal extras en carbos." },
    { day: "JUE", name: "Running (entrenador)", color: COLORS.muted,
      blocks: [{ time: "7:00", a: "Desayuno con carbos" }, { time: "Según entrena.", a: "Running según plan de tu entrenador" }, { time: "14:00", a: "Almuerzo tupper" }, { time: "19:00", a: "Cena" }],
      notes: "Descansa bien esta noche — mañana Full Body." },
    { day: "VIE", name: "Full Body 🔥", color: COLORS.green,
      blocks: [{ time: "9:00", a: "Sesión FULL BODY — ver bloques abajo" }, { time: "14:00", a: "Almuerzo tupper" }, { time: "19:00", a: "Cena" }],
      notes: "Sin running hoy — fuerza pura." },
    { day: "SÁB", name: "Running largo (entrenador)", color: COLORS.orange,
      blocks: [{ time: "7:30", a: "Desayuno rico en carbos: avena + plátano + yogurt" }, { time: "Según entrena.", a: "Long run según plan de tu entrenador" }, { time: "Post-run", a: "Batido proteico + plátano inmediato" }, { time: "14:00", a: "Almuerzo +200 kcal carbos extra (boniato/arroz)" }, { time: "19:00", a: "Cena normal del plan" }],
      notes: "⚠️ Añade 200-300 kcal en carbos al almuerzo. No recortes." },
    { day: "DOM", name: "Descanso Total", color: COLORS.muted,
      blocks: [{ time: "Mañana", a: "Batch cooking: prepara tuppers de 3-4 días" }, { time: "Todo el día", a: "Sin entrenamiento estructurado" }, { time: "Todo el día", a: "Come según el plan, sin saltarte comidas" }],
      notes: "Cocinar en batch ahorra tiempo y elimina decisiones en la semana." },
  ];

  useEffect(() => {
    (async () => {
      try {
        const r = await (async () => { const v = localStorage.getItem("training_done"); return v ? {value: v} : null; })();
        if (r) {
          const stored = JSON.parse(r.value);
          if (stored.monday === currentMonday) setDone(stored.exercises || {});
          else localStorage.setItem("training_done", JSON.stringify({ monday: currentMonday, exercises: {} }));
        }
      } catch {}
    })();
  }, []);

  async function toggleEx(blockId, exId) {
    const key = `${blockId}_${exId}`;
    const next = { ...done, [key]: !done[key] };
    setDone(next);
    try { localStorage.setItem("training_done", JSON.stringify({ monday: currentMonday, exercises: next })); } catch {}
  }

  function toggleExpandEx(key) { setExpandedEx(prev => ({ ...prev, [key]: !prev[key] })); }

  const equipColors = { "Barra": "#1a5c8a", "Mancuerna": "#c47a1a", "Máquina": "#7c5cbf", "Peso corporal": "#2d7a45", "Barra / Mancuerna": "#1a5c8a" };
  const block = TRAINING_BLOCKS.find(b => b.id === activeBlock);
  const blockDone = block ? block.exercises.filter(e => done[`${block.id}_${e.id}`]).length : 0;
  const blockTotal = block ? block.exercises.length : 0;

  return (
    <div>
      <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 10 }}>HORARIO SEMANAL</div>
      {weekPlan.map((day, i) => (
        <div key={i} style={{ background: COLORS.card, border: `1px solid ${expandedDay === i ? day.color : COLORS.cardBorder}`, borderRadius: 10, marginBottom: 8, overflow: "hidden", transition: "border 0.2s" }}>
          <button onClick={() => setExpandedDay(expandedDay === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "13px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: day.color, minWidth: 36 }}>{day.day}</span>
            <span style={{ fontSize: 12, color: COLORS.text, flex: 1 }}>{day.name}</span>
            <span style={{ color: COLORS.muted, fontSize: 11 }}>{expandedDay === i ? "▲" : "▼"}</span>
          </button>
          {expandedDay === i && (
            <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
              <div style={{ marginTop: 10 }}>
                {day.blocks.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: day.color, minWidth: 58, fontStyle: "italic" }}>{b.time}</span>
                    <span style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{b.a}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: COLORS.bg, borderRadius: 6, padding: "8px 12px", marginTop: 6 }}>
                <span style={{ fontSize: 10, color: day.color, fontStyle: "italic" }}>nota → </span>
                <span style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic" }}>{day.notes}</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Training blocks */}
      <div style={{ marginTop: 24, marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 10 }}>BLOQUES DE ENTRENAMIENTO</div>
        <div style={{ background: "#fff8f0", border: "1px solid #f0e0d0", borderRadius: 8, padding: "9px 14px", marginBottom: 14, fontSize: 11, color: COLORS.muted, fontStyle: "italic" }}>
          🔄 Reset automático cada lunes · Semana: <strong style={{ color: COLORS.accent }}>{currentMonday}</strong>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {TRAINING_BLOCKS.map(b => {
            const bDone = b.exercises.filter(e => done[`${b.id}_${e.id}`]).length;
            const isActive = activeBlock === b.id;
            return (
              <button key={b.id} onClick={() => setActiveBlock(b.id)}
                style={{ flex: 1, padding: "12px 6px", borderRadius: 10, border: `2px solid ${isActive ? b.color : COLORS.cardBorder}`, background: isActive ? b.color : COLORS.card, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                <div style={{ fontSize: 18 }}>{b.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: isActive ? "#fff" : COLORS.text, marginTop: 3 }}>{b.label}</div>
                <div style={{ fontSize: 9, color: isActive ? "rgba(255,255,255,0.75)" : COLORS.muted, marginTop: 1 }}>{b.day}</div>
                <div style={{ marginTop: 5, background: isActive ? "rgba(255,255,255,0.3)" : COLORS.cardBorder, borderRadius: 4, height: 4 }}>
                  <div style={{ width: `${(bDone / b.exercises.length) * 100}%`, background: isActive ? "#fff" : b.color, height: 4, borderRadius: 4, transition: "width 0.4s" }} />
                </div>
                <div style={{ fontSize: 9, color: isActive ? "rgba(255,255,255,0.85)" : COLORS.muted, marginTop: 2 }}>{bDone}/{b.exercises.length}</div>
              </button>
            );
          })}
        </div>

        {block && (
          <div>
            <div style={{ background: block.color, borderRadius: 10, padding: "14px 16px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{block.icon} {block.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2, fontStyle: "italic" }}>{block.subtitle}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>{blockDone}/{blockTotal}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>HECHOS</div>
              </div>
            </div>

            {block.exercises.map((ex) => {
              const key = `${block.id}_${ex.id}`;
              const isDone = !!done[key];
              const isExpanded = !!expandedEx[key];
              return (
                <div key={ex.id} style={{ background: COLORS.card, border: `1px solid ${isDone ? block.color : COLORS.cardBorder}`, borderRadius: 10, marginBottom: 10, overflow: "hidden", opacity: isDone ? 0.85 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", padding: "13px 16px", gap: 12 }}>
                    <button onClick={() => toggleEx(block.id, ex.id)}
                      style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${isDone ? block.color : COLORS.cardBorder}`, background: isDone ? block.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.15s" }}>
                      {isDone && <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>✓</span>}
                    </button>
                    <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleExpandEx(key)}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isDone ? COLORS.muted : COLORS.text, textDecoration: isDone ? "line-through" : "none" }}>{ex.name}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, background: block.color + "18", color: block.color, padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>{ex.sets} × {ex.reps}</span>
                        <span style={{ fontSize: 10, background: COLORS.bg, color: COLORS.muted, padding: "2px 7px", borderRadius: 4 }}>⏱ {ex.rest}</span>
                        <span style={{ fontSize: 10, background: (equipColors[ex.equipment] || COLORS.muted) + "18", color: equipColors[ex.equipment] || COLORS.muted, padding: "2px 7px", borderRadius: 4 }}>{ex.equipment}</span>
                      </div>
                    </div>
                    <button onClick={() => toggleExpandEx(key)} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 12, padding: "4px 8px" }}>
                      {isExpanded ? "▲" : "▼"}
                    </button>
                  </div>
                  {isExpanded && (
                    <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
                      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", marginBottom: 10 }}>
                        <span style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, alignSelf: "center" }}>MÚSCULOS →</span>
                        {ex.muscles.map(m => (
                          <span key={m} style={{ fontSize: 10, background: block.color + "15", color: block.color, padding: "3px 9px", borderRadius: 20, border: `1px solid ${block.color}30` }}>{m}</span>
                        ))}
                      </div>
                      <div style={{ background: COLORS.bg, borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
                        <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 6 }}>EJECUCIÓN</div>
                        {ex.tips.map((tip, j) => (
                          <div key={j} style={{ display: "flex", gap: 8, marginBottom: j < ex.tips.length - 1 ? 6 : 0 }}>
                            <span style={{ color: block.color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                            <span style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic", paddingLeft: 4 }}>💡 {ex.note}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DO & DONT TAB ───────────────────────────────────────────
function DosDonts() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Label color={COLORS.green}>✅ Do — hábitos clave</Label>
        {DOS.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderLeft: `3px solid ${COLORS.green}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>{item.text}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 20 }}>
        <Label color={COLORS.red}>❌ Don't — evita esto</Label>
        {DONTS.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderLeft: `3px solid ${COLORS.red}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>{item.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────
export default function CutPlan() {
  const [activeTab, setActiveTab] = useState(0);
  const [userTarget, setUserTarget] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user_calc");
      if (raw) { const d = JSON.parse(raw); setUserTarget(d.target || null); }
    } catch {}
  }, []);

  const TAB_ICONS  = ["📋","📆","🛒","📅","✅","🍽️"];
  const TAB_LABELS = ["Hábitos","Mi Plan","Compra","Semana","Normas","Recetas"];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.text, paddingBottom: 70 }}>
      {/* ── COMPACT TOP HEADER ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: COLORS.card, borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(200,68,10,0.25)" }}>
          <svg width="19" height="19" viewBox="0 0 28 28" fill="none">
            <text x="4" y="22" fontSize="22" fontWeight="900" fill="white" fontFamily="Georgia, serif">F</text>
            <path d="M16 18 L19 12 L22 16 L25 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85"/>
          </svg>
        </div>
        <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: -0.5, color: COLORS.text, lineHeight: 1 }}>FORMA</span>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px" }}>
        {activeTab === 0 && <HabitsTracker />}
        {activeTab === 1 && <MiPlanTab onUpdate={(d) => setUserTarget(d.target || null)} userTarget={userTarget} />}
        {activeTab === 2 && <ShoppingTab />}
        {activeTab === 3 && <WeekTab />}
        {activeTab === 4 && <DosDonts />}
        {activeTab === 5 && <RecetasTab />}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: COLORS.card, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        {TAB_ICONS.map((icon, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 3, padding: "10px 4px 8px", background: "none", border: "none", cursor: "pointer",
              fontFamily: "inherit", borderTop: `2px solid ${activeTab === i ? COLORS.accent : "transparent"}`,
              transition: "border-color 0.15s" }}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
            <span style={{ fontSize: 9, fontWeight: activeTab === i ? 700 : 400,
              color: activeTab === i ? COLORS.accent : COLORS.muted,
              letterSpacing: 0.3, lineHeight: 1 }}>
              {TAB_LABELS[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}// ─── RECETAS TAB (simple browser, no tracker) ────────────────
function RecetasTab() {
  const [activeMeal, setActiveMeal] = useState("desayunos");
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [customMeals, setCustomMeals] = useState({});
  const [form, setForm] = useState({ name: "", emoji: "🍽️", kcal: "", prot: "", carb: "", fat: "", prep: "", ing: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("custom_meals");
      if (raw) setCustomMeals(JSON.parse(raw));
    } catch {}
  }, []);

  function saveCustom(next) {
    setCustomMeals(next);
    try { localStorage.setItem("custom_meals", JSON.stringify(next)); } catch {}
  }

  function addRecipe() {
    if (!form.name || !form.kcal) return;
    const newRecipe = {
      name: form.name,
      emoji: form.emoji || "🍽️",
      ingredients: form.ing.split("\n").map(s => s.trim()).filter(Boolean),
      prep: form.prep,
      macros: { kcal: +form.kcal, prot: +form.prot || 0, carb: +form.carb || 0, fat: +form.fat || 0 },
      tupper: false,
      custom: true,
    };
    const next = { ...customMeals, [activeMeal]: [...(customMeals[activeMeal] || []), newRecipe] };
    saveCustom(next);
    setForm({ name: "", emoji: "🍽️", kcal: "", prot: "", carb: "", fat: "", prep: "", ing: "" });
    setShowForm(false);
  }

  function deleteCustom(cat, idx) {
    const arr = [...(customMeals[cat] || [])];
    arr.splice(idx, 0); arr.splice(idx, 1);
    const next = { ...customMeals, [cat]: arr };
    saveCustom(next);
  }
  const labels = { desayunos: "Desayunos", almuerzos: "Almuerzos", cenas: "Cenas", media_manana: "Media Mañana", pre_entreno: "Pre-Entreno" };
  const mealCatColors = { desayunos: "#c47a1a", almuerzos: COLORS.blue, cenas: "#7c5cbf", media_manana: COLORS.green, pre_entreno: COLORS.accent };

  function toggleExpand(key) { setExpanded(p => ({ ...p, [key]: !p[key] })); }

  const catColor = mealCatColors[activeMeal];
  const builtinMeals = meals[activeMeal] || [];
  const myMeals = customMeals[activeMeal] || [];
  const currentMeals = [...builtinMeals, ...myMeals];
  const filtered = search
    ? currentMeals.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || (m.ingredients || []).some(i => i.toLowerCase().includes(search.toLowerCase())))
    : currentMeals;

  return (
    <div>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: COLORS.muted, pointerEvents: "none" }}>🔍</span>
        <input type="text" placeholder="Buscar receta o ingrediente..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 12px 10px 36px", fontSize: 13, fontFamily: "inherit", color: COLORS.text, boxSizing: "border-box" }} />
        {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: COLORS.muted, fontSize: 18 }}>×</button>}
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.keys(meals).map(k => (
          <button key={k} onClick={() => { setActiveMeal(k); setSearch(""); }}
            style={{ background: activeMeal === k ? mealCatColors[k] : COLORS.card, color: activeMeal === k ? "#fff" : COLORS.muted,
              border: `1px solid ${activeMeal === k ? mealCatColors[k] : COLORS.cardBorder}`, borderRadius: 6, padding: "7px 14px",
              fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", transition: "all 0.15s" }}>
            {labels[k]}
          </button>
        ))}
      </div>

      {/* Count + Add button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic" }}>
          {filtered.length} receta{filtered.length !== 1 ? "s" : ""}{search ? ` para "${search}"` : ""}
        </div>
        <button onClick={() => setShowForm(!showForm)}
          style={{ background: showForm ? COLORS.bg : COLORS.accent, color: showForm ? COLORS.muted : "#fff", border: `1px solid ${showForm ? COLORS.cardBorder : COLORS.accent}`, borderRadius: 6, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", fontWeight: 700 }}>
          {showForm ? "× Cancelar" : "+ Nueva receta"}
        </button>
      </div>

      {/* New recipe form */}
      {showForm && (
        <div style={{ background: COLORS.card, border: `2px solid ${COLORS.accent}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: COLORS.accent, letterSpacing: 2, marginBottom: 14 }}>NUEVA RECETA — {Object.keys({desayunos:"Desayunos",almuerzos:"Almuerzos",cenas:"Cenas",media_manana:"Media Mañana",pre_entreno:"Pre-Entreno"})[Object.keys({desayunos:"Desayunos",almuerzos:"Almuerzos",cenas:"Cenas",media_manana:"Media Mañana",pre_entreno:"Pre-Entreno"}).indexOf(activeMeal)]?.toUpperCase() || activeMeal.toUpperCase()}</div>
          <div style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 8, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Emoji</div>
              <input value={form.emoji} onChange={e => setForm(f => ({...f, emoji: e.target.value}))}
                style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "8px 6px", fontSize: 20, textAlign: "center", boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Nombre *</div>
              <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="ej. Pollo con mango y arroz"
                style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "9px 12px", fontSize: 13, fontFamily: "inherit", color: COLORS.text, boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[["kcal","Kcal *",""], ["prot","Prot (g)",""], ["carb","Carb (g)",""], ["fat","Grasas (g)",""]].map(([k,l]) => (
              <div key={k}>
                <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>{l}</div>
                <input type="number" value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))} placeholder="0"
                  style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "8px 8px", fontSize: 13, fontFamily: "inherit", color: COLORS.text, boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Ingredientes (uno por línea)</div>
            <textarea value={form.ing} onChange={e => setForm(f => ({...f, ing: e.target.value}))} placeholder={"200g pechuga de pollo\n60g arroz basmati\n100g mango"}
              rows={4} style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "9px 12px", fontSize: 13, fontFamily: "inherit", color: COLORS.text, resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Preparación</div>
            <textarea value={form.prep} onChange={e => setForm(f => ({...f, prep: e.target.value}))} placeholder="Cómo se prepara..."
              rows={3} style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "9px 12px", fontSize: 13, fontFamily: "inherit", color: COLORS.text, resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <button onClick={addRecipe} disabled={!form.name || !form.kcal}
            style={{ background: form.name && form.kcal ? COLORS.accent : COLORS.cardBorder, color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", fontSize: 13, cursor: form.name && form.kcal ? "pointer" : "default", fontFamily: "inherit", fontWeight: 700, fontStyle: "italic" }}>
            Guardar receta ✓
          </button>
        </div>
      )}

      {/* Recipe cards */}
      {filtered.map((meal, i) => {
        const key = `${activeMeal}_${i}`;
        const isExpanded = !!expanded[key];
        return (
          <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "13px 16px", gap: 12, cursor: "pointer" }} onClick={() => toggleExpand(key)}>
              <span style={{ fontSize: 22 }}>{meal.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{meal.name}</div>
                  {meal.custom && <span style={{ fontSize: 9, background: COLORS.accent + "18", color: COLORS.accent, padding: "1px 6px", borderRadius: 4 }}>mía</span>}
                  {(() => { const t = kcalTier(meal.macros.kcal, activeMeal); return <span style={{ fontSize: 9, background: t.bg, color: t.color, padding: "1px 7px", borderRadius: 10, fontWeight: 700, border: `1px solid ${t.color}30` }}>{t.label}</span>; })()}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: catColor }}>{meal.macros.kcal} kcal</span>
                  <span style={{ fontSize: 10, color: COLORS.muted }}>{meal.macros.prot}g P · {meal.macros.carb}g C · {meal.macros.fat}g G</span>
                  {meal.tupper && <span style={{ fontSize: 9, background: "#f0f7f2", color: COLORS.green, padding: "1px 6px", borderRadius: 4, fontStyle: "italic" }}>📦 tupper</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {meal.custom && (
                  <button onClick={e => { e.stopPropagation(); const custIdx = (customMeals[activeMeal]||[]).findIndex(m => m.name === meal.name); deleteCustom(activeMeal, custIdx); }}
                    style={{ background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "3px 7px", fontSize: 11, color: COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>×</button>
                )}
                <span style={{ color: COLORS.muted, fontSize: 11 }}>{isExpanded ? "▲" : "▼"}</span>
              </div>
            </div>
            {isExpanded && (
              <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
                <div style={{ marginTop: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 6 }}>INGREDIENTES</div>
                  {meal.ingredients.map((ing, j) => (
                    <div key={j} style={{ fontSize: 12, color: COLORS.text, padding: "3px 0", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", gap: 8 }}>
                      <span style={{ color: catColor, fontSize: 10 }}>▸</span>{ing}
                    </div>
                  ))}
                </div>
                <div style={{ background: COLORS.bg, borderRadius: 6, padding: "10px 12px" }}>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 4 }}>PREP</div>
                  <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.6, fontStyle: "italic" }}>{meal.prep}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: COLORS.muted, fontStyle: "italic" }}>Sin resultados</div>}
    </div>
  );
}

// ─── HABITS TRACKER ───────────────────────────────────────
const DEFAULT_HABITS = [
  { id: "steps",     label: "10.000 pasos",            icon: "👟", color: COLORS.orange },
  { id: "water",     label: "3–4L de agua",            icon: "💧", color: COLORS.blue },
  { id: "sleep",     label: "8h de sueño",             icon: "😴", color: "#7c5cbf" },
  { id: "protein",   label: "Proteína en cada comida", icon: "🥩", color: COLORS.green },
  { id: "noalcohol", label: "Sin alcohol",             icon: "🚫", color: COLORS.red },
  { id: "training",  label: "Entreno completado",      icon: "💪", color: COLORS.accent },
];

const EMOJI_OPTIONS = ["👟","💧","😴","🥩","🚫","💪","⚖️","🧘","🏃","🚴","🎯","📵","🥦","☀️","🛌","🧂","📖","🚶","💊","🧠","🥗","🍵","🏋️","🤸"];

function HabitsTracker() {
  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [checked, setChecked] = useState({});
  const [history, setHistory] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newEmoji, setNewEmoji] = useState("🎯");
  const today = todayKey();

  useEffect(() => {
    try {
      // Load custom habits list
      const savedHabits = localStorage.getItem("custom_habits");
      if (savedHabits) setHabits(JSON.parse(savedHabits));
      // Load check history
      const savedHistory = localStorage.getItem("habits_history");
      if (savedHistory) {
        const all = JSON.parse(savedHistory);
        setHistory(all);
        setChecked(all[today] || {});
      }
    } catch {}
    setLoaded(true);
  }, []);

  function saveHabits(next) {
    setHabits(next);
    try { localStorage.setItem("custom_habits", JSON.stringify(next)); } catch {}
  }

  async function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    const nextHistory = { ...history, [today]: next };
    setHistory(nextHistory);
    try { localStorage.setItem("habits_history", JSON.stringify(nextHistory)); } catch {}
  }

  function deleteHabit(id) {
    const next = habits.filter(h => h.id !== id);
    saveHabits(next);
    // Clean from today's checked
    const nextChecked = { ...checked };
    delete nextChecked[id];
    setChecked(nextChecked);
    const nextHistory = { ...history, [today]: nextChecked };
    setHistory(nextHistory);
    try { localStorage.setItem("habits_history", JSON.stringify(nextHistory)); } catch {}
  }

  function addHabit() {
    if (!newLabel.trim()) return;
    const id = "custom_" + Date.now();
    const colors = [COLORS.accent, COLORS.green, COLORS.blue, COLORS.orange, "#7c5cbf", COLORS.red];
    const color = colors[habits.length % colors.length];
    const next = [...habits, { id, label: newLabel.trim(), icon: newEmoji, color }];
    saveHabits(next);
    setNewLabel("");
    setNewEmoji("🎯");
    setShowForm(false);
  }

  function resetToDefault() {
    saveHabits(DEFAULT_HABITS);
    setEditMode(false);
  }

  const done = Object.values(checked).filter(Boolean).length;
  const total = habits.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    const dayData = history[key] || {};
    const cnt = Object.values(dayData).filter(Boolean).length;
    const label = d.toLocaleDateString("es-ES", { weekday: "short" }).slice(0, 3).toUpperCase();
    return { key, label, cnt, isToday: key === today };
  });

  if (!loaded) return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontStyle: "italic" }}>Cargando...</div>;

  return (
    <div>
      {/* Progress ring */}
      <Card style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
          <svg viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)", width: 80, height: 80 }}>
            <circle cx="40" cy="40" r="32" fill="none" stroke={COLORS.cardBorder} strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke={pct === 100 ? COLORS.green : COLORS.accent}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - pct / 100)}`}
              style={{ transition: "stroke-dashoffset 0.5s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: pct === 100 ? COLORS.green : COLORS.accent }}>{pct}%</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 900 }}>{done}/{total} hábitos</div>
          <div style={{ fontSize: 12, color: COLORS.muted, fontStyle: "italic", marginTop: 4 }}>
            {pct === 100 ? "🎉 Día perfecto. Así se construyen resultados." : pct >= 70 ? "Buen día, sigue así." : "Quedan hábitos por marcar."}
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </Card>

      {/* Habit list */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Label style={{ marginBottom: 0 }}>Hábitos de hoy</Label>
          <div style={{ display: "flex", gap: 6 }}>
            {editMode && (
              <button onClick={resetToDefault}
                style={{ fontSize: 10, background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20,
                  padding: "3px 10px", color: COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>
                Restaurar
              </button>
            )}
            <button onClick={() => { setEditMode(!editMode); setShowForm(false); }}
              style={{ fontSize: 10, background: editMode ? COLORS.accent : "none",
                border: `1px solid ${editMode ? COLORS.accent : COLORS.cardBorder}`,
                borderRadius: 20, padding: "3px 10px",
                color: editMode ? "#fff" : COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>
              {editMode ? "✓ Listo" : "✏️ Editar"}
            </button>
          </div>
        </div>

        {habits.map((h, idx) => (
          <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderBottom: `1px solid ${COLORS.cardBorder}` }}>
            <span style={{ fontSize: 20 }}>{h.icon}</span>
            <span style={{ flex: 1, fontSize: 14, color: checked[h.id] ? COLORS.text : COLORS.muted,
              fontStyle: checked[h.id] ? "normal" : "italic" }}>
              {h.label}
            </span>
            {editMode ? (
              <button onClick={() => deleteHabit(h.id)}
                style={{ width: 26, height: 26, borderRadius: "50%", background: COLORS.red + "18",
                  border: `1px solid ${COLORS.red}40`, color: COLORS.red, fontSize: 14,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "inherit", flexShrink: 0 }}>
                ×
              </button>
            ) : (
              <button onClick={() => toggle(h.id)}
                style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${checked[h.id] ? h.color : COLORS.cardBorder}`,
                  background: checked[h.id] ? h.color : "transparent", display: "flex", alignItems: "center",
                  justifyContent: "center", transition: "all 0.15s", flexShrink: 0, cursor: "pointer" }}>
                {checked[h.id] && <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>✓</span>}
              </button>
            )}
          </div>
        ))}

        {/* Add new habit */}
        {editMode && !showForm && (
          <button onClick={() => setShowForm(true)}
            style={{ width: "100%", marginTop: 12, padding: "10px 0", background: COLORS.accentGlow || COLORS.bg,
              border: `1px dashed ${COLORS.accent}`, borderRadius: 8, color: COLORS.accent,
              cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 600 }}>
            + Añadir hábito
          </button>
        )}

        {editMode && showForm && (
          <div style={{ marginTop: 12, background: COLORS.bg, borderRadius: 10, padding: 14,
            border: `1px solid ${COLORS.cardBorder}` }}>
            <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 10 }}>NUEVO HÁBITO</div>

            {/* Emoji picker */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Icono</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {EMOJI_OPTIONS.map(e => (
                  <button key={e} onClick={() => setNewEmoji(e)}
                    style={{ width: 36, height: 36, borderRadius: 8, fontSize: 18,
                      border: `2px solid ${newEmoji === e ? COLORS.accent : COLORS.cardBorder}`,
                      background: newEmoji === e ? COLORS.accent + "18" : COLORS.card,
                      cursor: "pointer" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Label input */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Nombre del hábito</div>
              <input
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addHabit()}
                placeholder="ej. Meditar 10 min, Leer 20 páginas..."
                style={{ width: "100%", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 8, padding: "10px 12px", fontSize: 14, fontFamily: "inherit",
                  color: COLORS.text, boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={addHabit} disabled={!newLabel.trim()}
                style={{ background: newLabel.trim() ? COLORS.accent : COLORS.cardBorder,
                  color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px",
                  fontSize: 13, cursor: newLabel.trim() ? "pointer" : "default",
                  fontFamily: "inherit", fontWeight: 700 }}>
                Añadir ✓
              </button>
              <button onClick={() => { setShowForm(false); setNewLabel(""); setNewEmoji("🎯"); }}
                style={{ background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, color: COLORS.muted, cursor: "pointer",
                  fontFamily: "inherit" }}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Last 7 days */}
      <Card>
        <Label>Últimos 7 días</Label>
        <div style={{ display: "flex", gap: 8 }}>
          {last7.map(d => {
            const filledPct = total > 0 ? d.cnt / total : 0;
            const col = filledPct === 1 ? COLORS.green : filledPct >= 0.7 ? COLORS.orange : filledPct > 0 ? COLORS.blue : COLORS.cardBorder;
            return (
              <div key={d.key} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ background: col, borderRadius: 6, height: 40, marginBottom: 6, transition: "background 0.3s",
                  border: d.isToday ? `2px solid ${COLORS.accent}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {d.cnt > 0 && <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>{d.cnt}</span>}
                </div>
                <div style={{ fontSize: 9, color: d.isToday ? COLORS.accent : COLORS.muted, fontWeight: d.isToday ? 700 : 400 }}>{d.label}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
          {[{ col: COLORS.green, label: "Día perfecto" }, { col: COLORS.orange, label: "≥70%" }, { col: COLORS.blue, label: "Algo hecho" }, { col: COLORS.cardBorder, label: "Sin datos" }].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.col, border: `1px solid ${COLORS.cardBorder}` }} />
              <span style={{ fontSize: 10, color: COLORS.muted }}>{l.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

