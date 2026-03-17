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
    { name: "Bowl de requesón salado", emoji: "🥗",
      ingredients: ["200g requesón o cottage 0%", "100g tomate cherry", "80g pepino", "10g AOVE", "Orégano, sal, pimienta"],
      prep: "Monta en bowl. Corta el tomate y el pepino. Aliña con AOVE, sal y orégano. Listo en 3 min.",
      macros: { kcal: 280, prot: 24, carb: 12, fat: 12 }, tupper: true },
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
  ],
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
      ingredients: ["1 berenjena grande (300g)", "200g carne picada magra 5%", "100g tomate triturado", "40g mozzarella light"],
      prep: "Vacía la berenjena y saltea la carne con el tomate. Rellena, cubre con mozzarella. Horno 200° 20 min.",
      macros: { kcal: 490, prot: 44, carb: 18, fat: 22 }, tupper: true },
    { name: "Wok de ternera + brócoli + arroz", emoji: "🥦",
      ingredients: ["180g ternera magra en tiras", "200g brócoli", "60g arroz (seco)", "Salsa soja light 20ml, ajo, jengibre"],
      prep: "Wok muy caliente. Ternera 2 min, añade brócoli y soja, 4 min más. Arroz cocido aparte. Tupper.",
      macros: { kcal: 510, prot: 46, carb: 48, fat: 10 }, tupper: true },
  ],
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
    { name: "Crema de calabaza + huevo poché + AOVE", emoji: "🎃",
      ingredients: ["300g calabaza", "2 huevos", "10g AOVE", "Sal, nuez moscada, caldo de verduras"],
      prep: "Cuece la calabaza en caldo 20 min, tritura. Escalfa los huevos 3 min en agua con vinagre. Sirve encima.",
      macros: { kcal: 360, prot: 18, carb: 24, fat: 20 }, tupper: false },
    { name: "Salmón al vapor con jengibre + brócoli", emoji: "🐟",
      ingredients: ["180g salmón fresco", "200g brócoli", "Jengibre rallado 5g", "Salsa soja light 10ml, limón"],
      prep: "Salmón al vapor 12 min. Brócoli al vapor 5 min. Aliña con jengibre, soja y limón al momento.",
      macros: { kcal: 410, prot: 40, carb: 10, fat: 22 }, tupper: true },
    { name: "Rollitos de lechuga con carne picada asiática", emoji: "🥬",
      ingredients: ["200g ternera picada 5%", "8 hojas lechuga romana", "Soja light 15ml", "Ajo, jengibre, sésamo"],
      prep: "Saltea la carne con ajo, jengibre y soja 5 min. Sirve dentro de las hojas de lechuga. Sin carbos.",
      macros: { kcal: 380, prot: 42, carb: 6, fat: 20 }, tupper: false },
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
    { name: "Revuelto de claras + gambas + espárragos", emoji: "🍤",
      ingredients: ["150g claras pasteurizadas", "100g gambas peladas", "150g espárragos", "Ajo, AOVE spray, sal"],
      prep: "Saltea las gambas y espárragos con ajo 3 min. Añade las claras y revuelve hasta cuajar. 8 min total.",
      macros: { kcal: 360, prot: 44, carb: 6, fat: 14 }, tupper: false },
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
  ],
  media_manana: [
    { name: "Skyr + frutos rojos", emoji: "🍓",
      ingredients: ["200g skyr natural", "80g frutos rojos mixtos (frescos o congelados)"],
      prep: "Mezcla en bowl o tupper. Más proteína que el yogur griego estándar con menos calorías.",
      macros: { kcal: 155, prot: 20, carb: 16, fat: 1 }, tupper: true },
    { name: "Claras cocidas + tomate", emoji: "🍅",
      ingredients: ["4 claras de huevo cocidas (120g)", "1 tomate mediano (150g)", "Sal, orégano"],
      prep: "Cuece las claras en batch el domingo. Lleva en tupper con el tomate entero. Máximo nivel proteico mínimo.",
      macros: { kcal: 100, prot: 18, carb: 8, fat: 0 }, tupper: true },
    { name: "Mini tortilla de claras (batch prep)", emoji: "🍳",
      ingredients: ["3 claras de huevo", "1 huevo entero", "Sal, especias al gusto"],
      prep: "Prepara el domingo en sartén pequeña. Guarda en tupper. Come fría o calienta en microondas 45 seg.",
      macros: { kcal: 140, prot: 18, carb: 1, fat: 6 }, tupper: true },
    { name: "Jamón ibérico + manzana", emoji: "🍎",
      ingredients: ["50g jamón ibérico (sin grasa visible)", "1 manzana (150g)"],
      prep: "Come por separado. El ibérico aporta proteína + grasa de calidad. La manzana, fibra y saciedad.",
      macros: { kcal: 175, prot: 14, carb: 22, fat: 6 }, tupper: false },
    { name: "Smoothie proteico express", emoji: "🥤",
      ingredients: ["20g whey proteína vainilla", "150ml leche desnatada", "50g fresas frescas o congeladas"],
      prep: "Bate o agita en shaker. Consume en 10 min. Preparado en menos de 2 minutos.",
      macros: { kcal: 165, prot: 22, carb: 14, fat: 2 }, tupper: false },
    { name: "Queso fresco batido + pepino + sal", emoji: "🧀",
      ingredients: ["150g queso fresco batido 0%", "100g pepino en dados", "Sal, pimienta, eneldo"],
      prep: "Mezcla en tupper. Refrescante y muy bajo en calorías. Ideal en días de calor post-running.",
      macros: { kcal: 120, prot: 16, carb: 6, fat: 3 }, tupper: true },
    { name: "Pechuga de pollo fría + mostaza", emoji: "🍗",
      ingredients: ["100g pechuga de pollo cocida (fiambre natural o batch)", "1 cucharada mostaza Dijon"],
      prep: "Pollo cocido del batch cooking. Come directamente con mostaza como dip. Máxima proteína, mínimo esfuerzo.",
      macros: { kcal: 145, prot: 28, carb: 2, fat: 3 }, tupper: true },
    { name: "Mix de nueces + arándanos secos", emoji: "🫐",
      ingredients: ["20g nueces crudas", "20g arándanos secos sin azúcar añadido"],
      prep: "Prepara porciones en bolsitas el domingo. Snack de bolsillo para cuando estás fuera.",
      macros: { kcal: 180, prot: 4, carb: 18, fat: 12 }, tupper: false },
    { name: "Café proteico (protein latte)", emoji: "☕",
      ingredients: ["25g whey vainilla", "1 espresso (30ml)", "150ml leche desnatada fría"],
      prep: "Mezcla la leche fría con el whey hasta disolver. Añade el espresso. Agita bien. Frío o templado.",
      macros: { kcal: 160, prot: 22, carb: 10, fat: 2 }, tupper: false },
    { name: "Palitos de zanahoria + queso fresco", emoji: "🥕",
      ingredients: ["150g zanahoria en palitos", "80g queso fresco batido 0%"],
      prep: "Corta la zanahoria el domingo. Lleva el queso en un bote pequeño. Dip proteico bajo en calorías.",
      macros: { kcal: 110, prot: 10, carb: 14, fat: 2 }, tupper: true },
    { name: "Yogurt griego + nueces", emoji: "🥜",
      ingredients: ["200g yogurt griego 0%", "20g nueces"],
      prep: "Mezcla y listo. Cómelo entre el desayuno y el almuerzo.",
      macros: { kcal: 200, prot: 16, carb: 10, fat: 11 }, tupper: true },
    { name: "Requesón + fresas", emoji: "🍓",
      ingredients: ["100g requesón 0%", "100g fresas"],
      prep: "Mezcla en bowl. Añade edulcorante si quieres.",
      macros: { kcal: 120, prot: 14, carb: 10, fat: 1 }, tupper: true },
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
    { name: "Fruta de temporada + yogur griego", emoji: "🍊",
      ingredients: ["200g yogurt griego 0%", "150g fruta de temporada (naranja, melocotón, kiwi...)"],
      prep: "El snack más simple y efectivo. Proteína del yogur + carbos y electrolitos de la fruta.",
      macros: { kcal: 190, prot: 18, carb: 26, fat: 0 }, tupper: true },
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
    { name: "Batido whey post-entreno", emoji: "💪",
      ingredients: ["25g whey proteína", "300ml agua fría"],
      prep: "Agita en shaker. Tomar en los primeros 30 min tras el entreno.",
      macros: { kcal: 105, prot: 23, carb: 2, fat: 1 }, tupper: false },
    { name: "Plátano + whey", emoji: "🍌",
      ingredients: ["30g whey proteína", "1 plátano (120g)"],
      prep: "Batido o por separado. Ideal 30-45 min antes de entrenar para carbos rápidos.",
      macros: { kcal: 235, prot: 26, carb: 30, fat: 1 }, tupper: false },
    { name: "Yogur griego + miel", emoji: "🍯",
      ingredients: ["200g yogurt griego 0%", "10g miel"],
      prep: "Mezcla y toma 1h antes del entreno. Los carbos de la miel dan energía rápida.",
      macros: { kcal: 160, prot: 18, carb: 18, fat: 0 }, tupper: true },
    { name: "Pan integral + pechuga de pollo", emoji: "🥪",
      ingredients: ["60g pan integral", "60g pechuga de pollo en lonchas (fiambre natural)"],
      prep: "Montado en 1 min. Llévalo en tupper. Proteína + carbos antes del entreno.",
      macros: { kcal: 210, prot: 20, carb: 22, fat: 3 }, tupper: true },
    { name: "Tortitas de arroz + crema cacahuete", emoji: "🥜",
      ingredients: ["3 tortitas de arroz (27g)", "20g crema de cacahuete natural"],
      prep: "Unta la crema de cacahuete sobre las tortitas. Carbos + grasas saludables pre-entreno.",
      macros: { kcal: 190, prot: 5, carb: 25, fat: 8 }, tupper: false },
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
const HABITS = [
  { id: "steps", label: "10.000 pasos", icon: "👟", color: COLORS.orange },
  { id: "water", label: "3–4L de agua", icon: "💧", color: COLORS.blue },
  { id: "sleep", label: "8h de sueño", icon: "😴", color: "#7c5cbf" },
  { id: "protein", label: "Proteína en cada comida", icon: "🥩", color: COLORS.green },
  { id: "noalcohol", label: "Sin alcohol", icon: "🚫", color: COLORS.red },
  { id: "training", label: "Entreno completado", icon: "💪", color: COLORS.accent },
];

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

const TABS = ["📋 Hábitos", "🔢 Mi Plan", "🍽️ Comidas", "🛒 Compra", "📆 Planificador", "📅 Semana", "✅ Do & Don't"];

// ─── HELPERS ──────────────────────────────────────────────────
function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function calcTDEE(weight, height, age, sex, activity) {
  const bmr = sex === "H"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
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
function HabitsTracker() {
  const [checked, setChecked] = useState({});
  const [history, setHistory] = useState({});
  const [loaded, setLoaded] = useState(false);
  const today = todayKey();

  useEffect(() => {
    (async () => {
      try {
        const r = await (async () => { const v = localStorage.getItem("habits_history"); return v ? {value: v} : null; })();
        const all = r ? JSON.parse(r.value) : {};
        setHistory(all);
        setChecked(all[today] || {});
      } catch { setChecked({}); }
      setLoaded(true);
    })();
  }, []);

  async function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    const nextHistory = { ...history, [today]: next };
    setHistory(nextHistory);
    try { await (async () => { localStorage.setItem("habits_history", JSON.stringify(nextHistory)); })(); } catch {}
  }

  const done = Object.values(checked).filter(Boolean).length;
  const total = HABITS.length;
  const pct = Math.round((done / total) * 100);

  // Last 7 days streak
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
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: pct === 100 ? COLORS.green : COLORS.accent }}>{pct}%</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>{done}/{total} hábitos</div>
          <div style={{ fontSize: 12, color: COLORS.muted, fontStyle: "italic", marginTop: 4 }}>
            {pct === 100 ? "🎉 Día perfecto. Así se construyen resultados." : pct >= 70 ? "Buen día, sigue así." : "Quedan hábitos por marcar."}
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 6 }}>{new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </Card>

      {/* Habit checkboxes */}
      <Card>
        <Label>Hábitos de hoy</Label>
        {HABITS.map(h => (
          <button key={h.id} onClick={() => toggle(h.id)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "11px 0",
              borderBottom: `1px solid ${COLORS.cardBorder}`, background: "none", border: "none",
              cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              }}>
            <span style={{ fontSize: 20 }}>{h.icon}</span>
            <span style={{ flex: 1, fontSize: 14, color: checked[h.id] ? COLORS.text : COLORS.muted,
              textDecoration: checked[h.id] ? "none" : "none", fontStyle: checked[h.id] ? "normal" : "italic" }}>
              {h.label}
            </span>
            <span style={{
              width: 24, height: 24, borderRadius: 6, border: `2px solid ${checked[h.id] ? h.color : COLORS.cardBorder}`,
              background: checked[h.id] ? h.color : "transparent", display: "flex", alignItems: "center",
              justifyContent: "center", transition: "all 0.15s", flexShrink: 0
            }}>
              {checked[h.id] && <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>✓</span>}
            </span>
          </button>
        ))}
      </Card>

      {/* Last 7 days */}
      <Card>
        <Label>Últimos 7 días</Label>
        <div style={{ display: "flex", gap: 8 }}>
          {last7.map(d => {
            const filledPct = d.cnt / HABITS.length;
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

// ─── CALORIE CALCULATOR ───────────────────────────────────────
const STEPS = ["datos", "actividad", "resultado"];

function CalcPlan({ onUpdate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ weight: "", height: "", age: "", sex: "H", activity: "moderate", goal: "cut_aggressive" });
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await (async () => { const v = localStorage.getItem("user_calc"); return v ? {value: v} : null; })();
        if (r) { const d = JSON.parse(r.value); setSaved(d); onUpdate && onUpdate(d); }
      } catch {}
    })();
  }, []);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function save(result) {
    try { await (async () => { localStorage.setItem("user_calc", JSON.stringify(result)); })(); } catch {}
    setSaved(result);
    onUpdate && onUpdate(result);
  }

  function compute() {
    const tdee = calcTDEE(+form.weight, +form.height, +form.age, form.sex, form.activity);
    const deficits = { cut_aggressive: 700, cut_moderate: 400 };
    const deficit = deficits[form.goal] || 700;
    const target = tdee - deficit;
    const protein = Math.round(form.weight * 2.2);
    const result = { ...form, tdee, target, protein, deficit, weightLoss: (deficit * 7 / 7700).toFixed(2) };
    save(result);
    setStep(2);
  }

  const inputStyle = {
    width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6,
    padding: "10px 12px", fontSize: 14, fontFamily: "inherit", color: COLORS.text, boxSizing: "border-box"
  };
  const btnStyle = {
    background: COLORS.accent, color: "#fff", border: "none", borderRadius: 6, padding: "11px 24px",
    fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic"
  };

  if (saved && step === 0) {
    return (
      <div>
        <Card style={{ borderLeft: `3px solid ${COLORS.green}` }}>
          <Label color={COLORS.green}>Tu plan personalizado guardado</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {[
              { l: "TDEE", v: `${saved.tdee} kcal`, c: COLORS.muted },
              { l: "Objetivo", v: `${saved.target} kcal`, c: COLORS.accent },
              { l: "Proteína mínima", v: `${saved.protein}g`, c: COLORS.green },
              { l: "Pérdida estimada", v: `~${saved.weightLoss} kg/sem`, c: COLORS.orange },
            ].map(x => (
              <div key={x.l} style={{ background: COLORS.bg, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2 }}>{x.l}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: x.c, marginTop: 4 }}>{x.v}</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setSaved(null); setStep(0); }} style={{ ...btnStyle, background: COLORS.bg, color: COLORS.muted, border: `1px solid ${COLORS.cardBorder}`, fontSize: 11 }}>
            Recalcular →
          </button>
        </Card>
        <CalcCycling saved={saved} />
      </div>
    );
  }

  return (
    <div>
      <Card>
        {/* Progress bar */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? COLORS.accent : COLORS.cardBorder, transition: "background 0.3s" }} />
          ))}
        </div>

        {step === 0 && (
          <div>
            <Label>Datos personales</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Peso actual (kg)</div>
                <input style={inputStyle} type="number" value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="ej. 82" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Altura (cm)</div>
                <input style={inputStyle} type="number" value={form.height} onChange={e => set("height", e.target.value)} placeholder="ej. 178" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Edad</div>
                <input style={inputStyle} type="number" value={form.age} onChange={e => set("age", e.target.value)} placeholder="ej. 30" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Sexo</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["H", "Hombre"], ["M", "Mujer"]].map(([v, l]) => (
                    <button key={v} onClick={() => set("sex", v)}
                      style={{ flex: 1, padding: "10px 0", borderRadius: 6, border: `1px solid ${form.sex === v ? COLORS.accent : COLORS.cardBorder}`,
                        background: form.sex === v ? COLORS.accent : COLORS.bg, color: form.sex === v ? "#fff" : COLORS.muted,
                        cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontStyle: "italic" }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button style={btnStyle} onClick={() => form.weight && form.height && form.age && setStep(1)}>
              Siguiente →
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <Label>Nivel de actividad y objetivo</Label>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10 }}>Nivel de actividad actual</div>
              {[
                ["sedentary", "Sedentario", "Trabajo de escritorio, sin ejercicio"],
                ["light", "Ligero", "1-2 días de ejercicio suave"],
                ["moderate", "Moderado", "3-4 días de ejercicio (tu caso habitual)"],
                ["active", "Activo", "Entrenamiento diario o físicamente exigente"],
                ["very_active", "Muy activo", "Dobles sesiones, trabajo físico"],
              ].map(([v, l, d]) => (
                <button key={v} onClick={() => set("activity", v)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                    marginBottom: 6, borderRadius: 6, border: `1px solid ${form.activity === v ? COLORS.accent : COLORS.cardBorder}`,
                    background: form.activity === v ? "#fff5f2" : COLORS.bg,
                    cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${form.activity === v ? COLORS.accent : COLORS.cardBorder}`,
                    background: form.activity === v ? COLORS.accent : "transparent", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, color: COLORS.text, fontWeight: form.activity === v ? 700 : 400 }}>{l}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic" }}>{d}</div>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10 }}>Objetivo de déficit</div>
              {[
                ["cut_aggressive", "Corte agresivo (-700 kcal)", "~0.8-1 kg/semana — el plan original"],
                ["cut_moderate", "Corte moderado (-400 kcal)", "~0.4-0.5 kg/semana — más sostenible"],
              ].map(([v, l, d]) => (
                <button key={v} onClick={() => set("goal", v)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                    marginBottom: 6, borderRadius: 6, border: `1px solid ${form.goal === v ? COLORS.accent : COLORS.cardBorder}`,
                    background: form.goal === v ? "#fff5f2" : COLORS.bg,
                    cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${form.goal === v ? COLORS.accent : COLORS.cardBorder}`,
                    background: form.goal === v ? COLORS.accent : "transparent", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, color: COLORS.text, fontWeight: form.goal === v ? 700 : 400 }}>{l}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic" }}>{d}</div>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...btnStyle, background: COLORS.bg, color: COLORS.muted, border: `1px solid ${COLORS.cardBorder}` }} onClick={() => setStep(0)}>← Atrás</button>
              <button style={btnStyle} onClick={compute}>Calcular mi plan →</button>
            </div>
          </div>
        )}

        {step === 2 && saved && (
          <div>
            <Label color={COLORS.green}>Plan calculado para ti ✓</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { l: "Tu TDEE", v: `${saved.tdee} kcal`, c: COLORS.muted, sub: "calorías de mantenimiento" },
                { l: "Objetivo diario", v: `${saved.target} kcal`, c: COLORS.accent, sub: "déficit incluido" },
                { l: "Proteína mínima", v: `${saved.protein}g`, c: COLORS.green, sub: `${saved.weight}kg × 2.2` },
                { l: "Pérdida estimada", v: `~${saved.weightLoss} kg/sem`, c: COLORS.orange, sub: "con este déficit" },
              ].map(x => (
                <div key={x.l} style={{ background: COLORS.bg, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2 }}>{x.l}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: x.c, marginTop: 4 }}>{x.v}</div>
                  <div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic", marginTop: 2 }}>{x.sub}</div>
                </div>
              ))}
            </div>
            <CalcCycling saved={saved} />
          </div>
        )}
      </Card>
    </div>
  );
}

function CalcCycling({ saved }) {
  if (!saved) return null;
  const base = saved.target;
  return (
    <Card>
      <Label>Ciclado de calorías personalizado</Label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { l: "Descanso", kcal: Math.round(base - 150), d: "Viernes, Domingo", c: COLORS.muted },
          { l: "Entreno normal", kcal: base, d: "Lun, Mar, Jue", c: COLORS.blue },
          { l: "Carga (tempo + long)", kcal: Math.round(base + 200), d: "Miércoles, Sábado", c: COLORS.accent },
        ].map(x => (
          <div key={x.l} style={{ borderLeft: `3px solid ${x.c}`, paddingLeft: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: x.c }}>{x.kcal.toLocaleString("es-ES")}</div>
            <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1 }}>KCAL</div>
            <div style={{ fontSize: 11, color: COLORS.text, marginTop: 6, fontStyle: "italic" }}>{x.l}</div>
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>{x.d}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── MEALS TAB ────────────────────────────────────────────────
function MealsTab({ targetKcal }) {
  const [activeMeal, setActiveMeal] = useState("desayunos");
  const [eaten, setEaten] = useState({});
  const [expanded, setExpanded] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [customEntries, setCustomEntries] = useState({});
  const [customInput, setCustomInput] = useState({});
  const labels = { desayunos: "Desayunos", almuerzos: "Almuerzos", cenas: "Cenas", media_manana: "Media Mañana", pre_entreno: "Pre-Entreno" };
  const mealCatColors = { desayunos: "#c47a1a", almuerzos: COLORS.blue, cenas: "#7c5cbf", media_manana: COLORS.green, pre_entreno: COLORS.accent };

  function todayDateKey() { return new Date().toISOString().split("T")[0]; }

  useEffect(() => {
    (async () => {
      try {
        const r = await (async () => { const v = localStorage.getItem("meals_eaten"); return v ? {value: v} : null; })();
        if (r) {
          const stored = JSON.parse(r.value);
          if (stored.date === todayDateKey()) {
            setEaten(stored.eaten || {});
            setCustomEntries(stored.custom || {});
          } else {
            localStorage.setItem("meals_eaten", JSON.stringify({ date: todayDateKey(), eaten: {}, custom: {} }));
          }
        }
      } catch {}
      setLoaded(true);
    })();
    // Schedule midnight reset check every minute
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setEaten({});
        (async () => { localStorage.setItem("meals_eaten", JSON.stringify({ date: todayDateKey(), eaten: {} })); })();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  async function toggleMeal(cat, idx, kcal) {
    const key = `${cat}_${idx}`;
    const next = { ...eaten, [key]: eaten[key] ? null : { kcal, cat } };
    // clean nulls
    Object.keys(next).forEach(k => { if (!next[k]) delete next[k]; });
    setEaten(next);
    try { localStorage.setItem("meals_eaten", JSON.stringify({ date: todayDateKey(), eaten: next, custom: customEntries })); } catch {}
  }

  function toggleExpand(key) { setExpanded(p => ({ ...p, [key]: !p[key] })); }

  async function addCustomEntry(cat) {
    const kcal = parseInt(customInput[cat] || "0");
    if (!kcal || kcal <= 0) return;
    const existing = customEntries[cat] || [];
    const next = { ...customEntries, [cat]: [...existing, kcal] };
    setCustomEntries(next);
    setCustomInput(p => ({ ...p, [cat]: "" }));
    try { localStorage.setItem("meals_eaten", JSON.stringify({ date: todayDateKey(), eaten, custom: next })); } catch {}
  }

  async function removeCustomEntry(cat, idx) {
    const existing = [...(customEntries[cat] || [])];
    existing.splice(idx, 1);
    const next = { ...customEntries, [cat]: existing };
    setCustomEntries(next);
    try { localStorage.setItem("meals_eaten", JSON.stringify({ date: todayDateKey(), eaten, custom: next })); } catch {}
  }

  // Totals
  const customKcalTotal = Object.values(customEntries).flat().reduce((s, v) => s + (v || 0), 0);
  const totalKcal = Object.values(eaten).reduce((s, v) => s + (v?.kcal || 0), 0) + customKcalTotal;
  const totalProt = Object.entries(eaten).reduce((s, [k, v]) => {
    if (!v) return s;
    const [cat, idx] = k.split("_");
    const meal = meals[cat]?.[+idx];
    return s + (meal?.macros?.prot || 0);
  }, 0);
  const totalCarb = Object.entries(eaten).reduce((s, [k, v]) => {
    if (!v) return s;
    const [cat, idx] = k.split("_");
    const meal = meals[cat]?.[+idx];
    return s + (meal?.macros?.carb || 0);
  }, 0);
  const totalFat = Object.entries(eaten).reduce((s, [k, v]) => {
    if (!v) return s;
    const [cat, idx] = k.split("_");
    const meal = meals[cat]?.[+idx];
    return s + (meal?.macros?.fat || 0);
  }, 0);

  const TARGET_KCAL = targetKcal || 1700;
  const pct = Math.min(100, Math.round((totalKcal / TARGET_KCAL) * 100));
  const remaining = TARGET_KCAL - totalKcal;
  const isOver = totalKcal > TARGET_KCAL;
  const eatenCount = Object.keys(eaten).length;

  // Category counts
  const catCounts = Object.entries(eaten).reduce((acc, [k]) => {
    const cat = k.split("_")[0];
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  if (!loaded) return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontStyle: "italic" }}>Cargando...</div>;

  return (
    <div>
      {/* ── CALORIE TRACKER ── */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
        {/* Main numbers */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 4 }}>CALORÍAS HOY</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: isOver ? COLORS.red : COLORS.accent, lineHeight: 1 }}>
                {totalKcal.toLocaleString("es-ES")}
              </span>
              <span style={{ fontSize: 14, color: COLORS.muted }}>/ {TARGET_KCAL.toLocaleString("es-ES")} kcal</span>
            </div>
            <div style={{ fontSize: 12, color: isOver ? COLORS.red : COLORS.green, fontStyle: "italic", marginTop: 4 }}>
              {isOver ? `+${Math.abs(remaining)} kcal por encima del objetivo` : remaining > 0 ? `${remaining} kcal restantes` : "¡Objetivo alcanzado!"}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2 }}>{eatenCount} comida{eatenCount !== 1 ? "s" : ""} marcada{eatenCount !== 1 ? "s" : ""}</div>
            <div style={{ fontSize: 10, color: COLORS.muted, fontStyle: "italic" }}>
              {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "short" })}
            </div>
            <div style={{ fontSize: 9, color: COLORS.muted, marginTop: 4 }}>↺ reset a las 00:00</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: COLORS.bg, borderRadius: 6, height: 10, marginBottom: 14, overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`, height: 10, borderRadius: 6, transition: "width 0.5s",
            background: isOver ? COLORS.red : pct > 85 ? COLORS.orange : COLORS.accent
          }} />
        </div>

        {/* Macro breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[
            { l: "Proteína", v: totalProt, c: COLORS.green, unit: "g" },
            { l: "Carbos", v: totalCarb, c: COLORS.blue, unit: "g" },
            { l: "Grasas", v: totalFat, c: COLORS.orange, unit: "g" },
          ].map(m => (
            <div key={m.l} style={{ background: COLORS.bg, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: m.c }}>{m.v}{m.unit}</div>
              <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, marginTop: 2 }}>{m.l}</div>
            </div>
          ))}
        </div>

        {/* Category pills */}
        {eatenCount > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {Object.entries(catCounts).map(([cat, cnt]) => (
              <span key={cat} style={{ fontSize: 10, background: mealCatColors[cat] + "18", color: mealCatColors[cat], padding: "3px 10px", borderRadius: 20, border: `1px solid ${mealCatColors[cat]}30` }}>
                {labels[cat]} ×{cnt}
              </span>
            ))}
            <button onClick={async () => { setEaten({}); setCustomEntries({}); try { localStorage.setItem("meals_eaten", JSON.stringify({ date: todayDateKey(), eaten: {}, custom: {} })); } catch {} }}
              style={{ fontSize: 10, background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: "3px 10px", color: COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>
              Resetear
            </button>
          </div>
        )}
      </div>

      {/* ── CATEGORY TABS ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.keys(meals).map(k => {
          const cnt = catCounts[k] || 0;
          const isActive = activeMeal === k;
          return (
            <button key={k} onClick={() => setActiveMeal(k)}
              style={{ background: isActive ? mealCatColors[k] : COLORS.card,
                color: isActive ? "#fff" : COLORS.muted,
                border: `1px solid ${isActive ? mealCatColors[k] : COLORS.cardBorder}`,
                borderRadius: 6, padding: "7px 14px", fontSize: 11, cursor: "pointer",
                fontFamily: "inherit", fontStyle: "italic", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 6 }}>
              {labels[k]}
              {cnt > 0 && (
                <span style={{ background: isActive ? "rgba(255,255,255,0.3)" : mealCatColors[k] + "25",
                  color: isActive ? "#fff" : mealCatColors[k],
                  borderRadius: 10, fontSize: 9, padding: "1px 6px", fontStyle: "normal", fontWeight: 700 }}>
                  {cnt}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── CUSTOM ENTRY ── */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 10 }}>AÑADIR ENTRADA MANUAL</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            min="0"
            placeholder="ej. 250 kcal"
            value={customInput[activeMeal] || ""}
            onChange={e => setCustomInput(p => ({ ...p, [activeMeal]: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && addCustomEntry(activeMeal)}
            style={{ flex: 1, background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6,
              padding: "9px 12px", fontSize: 14, fontFamily: "inherit", color: COLORS.text }}
          />
          <button onClick={() => addCustomEntry(activeMeal)}
            style={{ background: mealCatColors[activeMeal], color: "#fff", border: "none", borderRadius: 6,
              padding: "9px 18px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", fontWeight: 700 }}>
            + Añadir
          </button>
        </div>
        {(customEntries[activeMeal] || []).length > 0 && (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(customEntries[activeMeal] || []).map((kcal, idx) => (
              <span key={idx} style={{ display: "flex", alignItems: "center", gap: 4, background: mealCatColors[activeMeal] + "18",
                border: `1px solid ${mealCatColors[activeMeal]}30`, borderRadius: 20, padding: "3px 10px", fontSize: 11, color: mealCatColors[activeMeal] }}>
                {kcal} kcal
                <button onClick={() => removeCustomEntry(activeMeal, idx)}
                  style={{ background: "none", border: "none", color: mealCatColors[activeMeal], cursor: "pointer",
                    fontSize: 13, lineHeight: 1, padding: "0 0 0 2px", fontFamily: "inherit" }}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── MEAL CARDS ── */}
      {meals[activeMeal].map((meal, i) => {
        const key = `${activeMeal}_${i}`;
        const isEaten = !!eaten[key];
        const isExpanded = !!expanded[key];
        const catColor = mealCatColors[activeMeal];
        return (
          <div key={i} style={{ background: COLORS.card, border: `1px solid ${isEaten ? catColor : COLORS.cardBorder}`,
            borderRadius: 10, marginBottom: 10, overflow: "hidden", transition: "all 0.2s",
            opacity: isEaten ? 0.88 : 1 }}>

            {/* Card top: checkbox + name + kcal + expand */}
            <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 12 }}>
              {/* Checkbox */}
              <button onClick={() => toggleMeal(activeMeal, i, meal.macros.kcal)}
                style={{ width: 30, height: 30, borderRadius: 8, border: `2px solid ${isEaten ? catColor : COLORS.cardBorder}`,
                  background: isEaten ? catColor : "transparent", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.15s" }}>
                {isEaten && <span style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>✓</span>}
              </button>

              {/* Emoji + name */}
              <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleExpand(key)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>{meal.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isEaten ? COLORS.muted : COLORS.text,
                      textDecoration: isEaten ? "line-through" : "none" }}>{meal.name}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                      {meal.tupper && <span style={{ fontSize: 9, background: "#f0f7f2", color: COLORS.green, padding: "1px 6px", borderRadius: 4, fontStyle: "italic" }}>📦 tupper</span>}
                      <span style={{ fontSize: 10, color: COLORS.muted }}>{meal.macros.prot}g prot · {meal.macros.carb}g carb · {meal.macros.fat}g fat</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kcal + expand */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: isEaten ? COLORS.muted : catColor }}>{meal.macros.kcal}</div>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1 }}>KCAL</div>
                </div>
                <button onClick={() => toggleExpand(key)}
                  style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 11, padding: "4px" }}>
                  {isExpanded ? "▲" : "▼"}
                </button>
              </div>
            </div>

            {/* Expanded detail */}
            {isExpanded && (
              <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
                <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
                  {[{ l: "Prot", v: meal.macros.prot, c: COLORS.green }, { l: "Carb", v: meal.macros.carb, c: COLORS.blue }, { l: "Fat", v: meal.macros.fat, c: COLORS.orange }].map(m => (
                    <div key={m.l} style={{ background: COLORS.bg, borderRadius: 6, padding: "6px 10px", flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 15, fontWeight: 900, color: m.c }}>{m.v}g</div>
                      <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 6 }}>INGREDIENTES</div>
                  {meal.ingredients.map((ing, j) => (
                    <div key={j} style={{ fontSize: 12, color: COLORS.text, padding: "4px 0", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", gap: 8 }}>
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
    </div>
  );
}

// ─── WEEK TAB ────────────────────────────────────────────────
function WeekTab() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedEx, setExpandedEx] = useState({});
  const [done, setDone] = useState({});
  const [activeBlock, setActiveBlock] = useState("push");
  const currentMonday = getCurrentMonday();

  useEffect(() => {
    (async () => {
      try {
        const r = await (async () => { const v = localStorage.getItem("training_done"); return v ? {value: v} : null; })();
        if (r) {
          const stored = JSON.parse(r.value);
          if (stored.monday === currentMonday) setDone(stored.exercises || {});
          else { await (async () => { localStorage.setItem("training_done", JSON.stringify({ monday: currentMonday, exercises: {} })); })(); }
        }
      } catch {}
    })();
  }, []);

  async function toggleEx(blockId, exId) {
    const key = `${blockId}_${exId}`;
    const next = { ...done, [key]: !done[key] };
    setDone(next);
    try { await (async () => { localStorage.setItem("training_done", JSON.stringify({ monday: currentMonday, exercises: next })); })(); } catch {}
  }

  function toggleExpandEx(key) {
    setExpandedEx(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const equipColors = { "Barra": "#1a5c8a", "Mancuerna": "#c47a1a", "Máquina": "#7c5cbf", "Peso corporal": "#2d7a45", "Barra / Mancuerna": "#1a5c8a" };

  const block = TRAINING_BLOCKS.find(b => b.id === activeBlock);
  const blockDone = block ? block.exercises.filter(e => done[`${block.id}_${e.id}`]).length : 0;
  const blockTotal = block ? block.exercises.length : 0;

  return (
    <div>
      {/* Week schedule */}
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
                    <span style={{ fontSize: 10, color: day.color, minWidth: 58, paddingTop: 2, fontStyle: "italic" }}>{b.time}</span>
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
      <div style={{ marginTop: 28, marginBottom: 12 }}>
        <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 12 }}>BLOQUES DE ENTRENAMIENTO</div>
        <div style={{ background: "#fff8f0", border: `1px solid #f0e0d0`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: COLORS.muted, fontStyle: "italic" }}>
          🔄 Los marcadores se reinician automáticamente cada lunes. Semana: <strong style={{ color: COLORS.accent }}>{currentMonday}</strong>
        </div>

        {/* Block selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {TRAINING_BLOCKS.map(b => {
            const bDone = b.exercises.filter(e => done[`${b.id}_${e.id}`]).length;
            const isActive = activeBlock === b.id;
            return (
              <button key={b.id} onClick={() => setActiveBlock(b.id)}
                style={{ flex: 1, padding: "14px 8px", borderRadius: 10, border: `2px solid ${isActive ? b.color : COLORS.cardBorder}`,
                  background: isActive ? b.color : COLORS.card, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", position: "relative" }}>
                <div style={{ fontSize: 20 }}>{b.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: isActive ? "#fff" : COLORS.text, marginTop: 4 }}>{b.label}</div>
                <div style={{ fontSize: 9, color: isActive ? "rgba(255,255,255,0.75)" : COLORS.muted, marginTop: 2 }}>{b.day}</div>
                <div style={{ marginTop: 6, background: isActive ? "rgba(255,255,255,0.3)" : COLORS.cardBorder, borderRadius: 4, height: 4 }}>
                  <div style={{ width: `${(bDone/b.exercises.length)*100}%`, background: isActive ? "#fff" : b.color, height: 4, borderRadius: 4, transition: "width 0.4s" }} />
                </div>
                <div style={{ fontSize: 9, color: isActive ? "rgba(255,255,255,0.85)" : COLORS.muted, marginTop: 3 }}>{bDone}/{b.exercises.length}</div>
              </button>
            );
          })}
        </div>

        {/* Block header */}
        {block && (
          <div>
            <div style={{ background: block.color, borderRadius: 10, padding: "16px 18px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{block.icon} {block.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2, fontStyle: "italic" }}>{block.subtitle}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{blockDone}/{blockTotal}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>HECHOS</div>
              </div>
            </div>

            {block.exercises.map((ex, i) => {
              const key = `${block.id}_${ex.id}`;
              const isDone = !!done[key];
              const isExpanded = !!expandedEx[key];
              return (
                <div key={ex.id} style={{ background: COLORS.card, border: `1px solid ${isDone ? block.color : COLORS.cardBorder}`, borderRadius: 10, marginBottom: 10, overflow: "hidden", transition: "border 0.2s", opacity: isDone ? 0.85 : 1 }}>
                  {/* Exercise header row */}
                  <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 12 }}>
                    {/* Checkbox */}
                    <button onClick={() => toggleEx(block.id, ex.id)}
                      style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${isDone ? block.color : COLORS.cardBorder}`,
                        background: isDone ? block.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0, transition: "all 0.15s" }}>
                      {isDone && <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>✓</span>}
                    </button>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => toggleExpandEx(key)}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: isDone ? COLORS.muted : COLORS.text, textDecoration: isDone ? "line-through" : "none" }}>{ex.name}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, background: block.color + "18", color: block.color, padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>{ex.sets} × {ex.reps}</span>
                        <span style={{ fontSize: 10, background: COLORS.bg, color: COLORS.muted, padding: "2px 7px", borderRadius: 4 }}>⏱ {ex.rest}</span>
                        <span style={{ fontSize: 10, background: (equipColors[ex.equipment] || COLORS.muted) + "18", color: equipColors[ex.equipment] || COLORS.muted, padding: "2px 7px", borderRadius: 4 }}>{ex.equipment}</span>
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button onClick={() => toggleExpandEx(key)}
                      style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 12, padding: "4px 8px" }}>
                      {isExpanded ? "▲" : "▼"}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
                      {/* Muscle groups */}
                      <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap", marginBottom: 12 }}>
                        <span style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, alignSelf: "center" }}>MÚSCULOS →</span>
                        {ex.muscles.map(m => (
                          <span key={m} style={{ fontSize: 10, background: block.color + "15", color: block.color, padding: "3px 9px", borderRadius: 20, border: `1px solid ${block.color}30` }}>{m}</span>
                        ))}
                      </div>

                      {/* Tips */}
                      <div style={{ background: COLORS.bg, borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
                        <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>EJECUCIÓN</div>
                        {ex.tips.map((tip, j) => (
                          <div key={j} style={{ display: "flex", gap: 8, marginBottom: j < ex.tips.length - 1 ? 7 : 0 }}>
                            <span style={{ color: block.color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                            <span style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{tip}</span>
                          </div>
                        ))}
                      </div>

                      {/* Note */}
                      <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic", paddingLeft: 4 }}>
                        💡 {ex.note}
                      </div>
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



// ─── MEAL PLANNER ─────────────────────────────────────────────
const DAYS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const SLOTS = [
  { key: "desayuno", label: "Desayuno", mealKey: "desayunos", emoji: "☀️" },
  { key: "media_m", label: "Media Mañana", mealKey: "media_manana", emoji: "🍎" },
  { key: "almuerzo", label: "Almuerzo", mealKey: "almuerzos", emoji: "🍗" },
  { key: "pre", label: "Pre-Entreno", mealKey: "pre_entreno", emoji: "💪" },
  { key: "cena", label: "Cena", mealKey: "cenas", emoji: "🌙" },
];

function getSundayKey() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? 0 : 7 - day; // days until next sunday
  const sunday = new Date(d);
  sunday.setDate(d.getDate() + diff);
  return sunday.toISOString().split("T")[0];
}

function getPlannerWeekLabel() {
  const d = new Date();
  const day = d.getDay();
  // Monday of current week
  const mon = new Date(d);
  mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (dt) => dt.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  return `${fmt(mon)} – ${fmt(sun)}`;
}

function PlannerTab() {
  const [plan, setPlan] = useState({}); // { "LUN": { desayuno: {name, kcal, prot, carb, fat, ingredients}, ... }, ... }
  const [activeDay, setActiveDay] = useState("LUN");
  const [picker, setPicker] = useState(null); // { day, slotKey, mealKey }
  const [loaded, setLoaded] = useState(false);
  const [exported, setExported] = useState(false);
  const sundayKey = getSundayKey();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("meal_plan");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.sunday === sundayKey) setPlan(d.plan || {});
        else localStorage.setItem("meal_plan", JSON.stringify({ sunday: sundayKey, plan: {} }));
      }
    } catch {}
    setLoaded(true);
  }, []);

  function savePlan(next) {
    setPlan(next);
    try { localStorage.setItem("meal_plan", JSON.stringify({ sunday: sundayKey, plan: next })); } catch {}
  }

  function selectMeal(day, slotKey, meal) {
    const next = {
      ...plan,
      [day]: {
        ...(plan[day] || {}),
        [slotKey]: { name: meal.name, emoji: meal.emoji, kcal: meal.macros.kcal, prot: meal.macros.prot, carb: meal.macros.carb, fat: meal.macros.fat, ingredients: meal.ingredients }
      }
    };
    savePlan(next);
    setPicker(null);
  }

  function clearSlot(day, slotKey) {
    const next = { ...plan, [day]: { ...(plan[day] || {}), [slotKey]: null } };
    savePlan(next);
  }

  function clearDay(day) {
    const next = { ...plan, [day]: {} };
    savePlan(next);
  }

  function dayKcal(day) {
    if (!plan[day]) return 0;
    return Object.values(plan[day]).reduce((s, m) => s + (m?.kcal || 0), 0);
  }

  function totalKcalWeek() {
    return DAYS.reduce((s, d) => s + dayKcal(d), 0);
  }

  function exportToShop() {
    // Collect all ingredients from planned meals, add as custom items in shop list
    const allIngredients = [];
    DAYS.forEach(day => {
      if (!plan[day]) return;
      Object.values(plan[day]).forEach(meal => {
        if (!meal?.ingredients) return;
        meal.ingredients.forEach(ing => allIngredients.push(ing));
      });
    });
    // Dedupe
    const unique = [...new Set(allIngredients)];
    try {
      const raw = localStorage.getItem("shop_list");
      const d = raw ? JSON.parse(raw) : { checked: {}, custom: [] };
      const existingNames = new Set((d.custom || []).map(i => i.name));
      const toAdd = unique.filter(n => !existingNames.has(n));
      d.custom = [...(d.custom || []), ...toAdd.map(n => ({ name: n, cat: "Mis añadidos" }))];
      localStorage.setItem("shop_list", JSON.stringify(d));
      setExported(true);
      setTimeout(() => setExported(false), 2500);
    } catch {}
  }

  const dayKcalVal = dayKcal(activeDay);
  const TARGET = 1700;

  if (!loaded) return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontStyle: "italic" }}>Cargando...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "14px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 4 }}>SEMANA ACTUAL</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{getPlannerWeekLabel()}</div>
          <div style={{ fontSize: 11, color: COLORS.muted, fontStyle: "italic", marginTop: 2 }}>
            {totalKcalWeek() > 0 ? `${totalKcalWeek().toLocaleString("es-ES")} kcal planificadas` : "Sin planificar aún"}
          </div>
        </div>
        <button onClick={exportToShop}
          style={{ background: exported ? COLORS.green : COLORS.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", fontWeight: 700, transition: "background 0.3s", textAlign: "center" }}>
          {exported ? "✓ Añadido!" : "🛒 Exportar a compra"}
        </button>
      </div>

      {/* Weekly kcal overview */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto" }}>
        {DAYS.map((day, i) => {
          const kcal = dayKcal(day);
          const pct = Math.min(100, (kcal / TARGET) * 100);
          const isActive = activeDay === day;
          const col = kcal === 0 ? COLORS.cardBorder : kcal > TARGET * 1.1 ? COLORS.red : kcal >= TARGET * 0.85 ? COLORS.green : COLORS.orange;
          return (
            <button key={day} onClick={() => setActiveDay(day)}
              style={{ flex: 1, minWidth: 44, background: isActive ? COLORS.accent : COLORS.card,
                border: `1px solid ${isActive ? COLORS.accent : COLORS.cardBorder}`, borderRadius: 8,
                padding: "8px 4px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: isActive ? "#fff" : COLORS.muted, marginBottom: 4 }}>{day}</div>
              <div style={{ background: isActive ? "rgba(255,255,255,0.2)" : COLORS.bg, borderRadius: 4, height: 32, display: "flex", alignItems: "flex-end", overflow: "hidden", margin: "0 4px" }}>
                <div style={{ width: "100%", background: isActive ? "rgba(255,255,255,0.6)" : col, height: `${Math.max(4, pct)}%`, borderRadius: 2, transition: "height 0.4s" }} />
              </div>
              <div style={{ fontSize: 9, color: isActive ? "rgba(255,255,255,0.85)" : COLORS.muted, marginTop: 4 }}>
                {kcal > 0 ? `${kcal}` : "—"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Day detail */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
        {/* Day header */}
        <div style={{ background: COLORS.accent, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>{DAY_NAMES[DAYS.indexOf(activeDay)]}</span>
            {dayKcalVal > 0 && (
              <span style={{ marginLeft: 10, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                {dayKcalVal} kcal · {Math.round(Object.values(plan[activeDay] || {}).reduce((s, m) => s + (m?.prot || 0), 0))}g prot
              </span>
            )}
          </div>
          {dayKcalVal > 0 && (
            <button onClick={() => clearDay(activeDay)}
              style={{ fontSize: 10, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "4px 10px", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
              Borrar día ×
            </button>
          )}
        </div>

        {/* Calorie bar */}
        {dayKcalVal > 0 && (
          <div style={{ padding: "8px 16px 0" }}>
            <div style={{ background: COLORS.bg, borderRadius: 4, height: 6, overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, (dayKcalVal / TARGET) * 100)}%`, height: 6,
                background: dayKcalVal > TARGET * 1.1 ? COLORS.red : dayKcalVal >= TARGET * 0.85 ? COLORS.green : COLORS.orange,
                borderRadius: 4, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 9, color: COLORS.muted, marginTop: 4, marginBottom: 8, textAlign: "right" }}>
              {dayKcalVal > TARGET ? `+${dayKcalVal - TARGET} kcal sobre objetivo` : `${TARGET - dayKcalVal} kcal restantes`}
            </div>
          </div>
        )}

        {/* Meal slots */}
        {SLOTS.map((slot, si) => {
          const meal = plan[activeDay]?.[slot.key];
          return (
            <div key={slot.key} style={{ borderTop: si > 0 ? `1px solid ${COLORS.cardBorder}` : "none" }}>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{slot.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, marginBottom: 2 }}>{slot.label.toUpperCase()}</div>
                      {meal ? (
                        <div>
                          <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{meal.emoji} {meal.name}</div>
                          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
                            {meal.kcal} kcal · {meal.prot}g P · {meal.carb}g C · {meal.fat}g G
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: COLORS.muted, fontStyle: "italic" }}>Sin planificar</div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {meal && (
                      <button onClick={() => clearSlot(activeDay, slot.key)}
                        style={{ background: "none", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "5px 8px", fontSize: 11, color: COLORS.muted, cursor: "pointer", fontFamily: "inherit" }}>
                        ×
                      </button>
                    )}
                    <button onClick={() => setPicker({ day: activeDay, slotKey: slot.key, mealKey: slot.mealKey, label: slot.label })}
                      style={{ background: COLORS.accent, border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontStyle: "italic", fontWeight: 700 }}>
                      {meal ? "Cambiar" : "+ Elegir"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PICKER MODAL */}
      {picker && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          onClick={(e) => e.target === e.currentTarget && setPicker(null)}>
          <div style={{ background: COLORS.bg, borderRadius: "16px 16px 0 0", width: "100%", maxWidth: 720, maxHeight: "75vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Picker header */}
            <div style={{ padding: "16px 20px 12px", background: COLORS.card, borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 2 }}>ELEGIR PARA</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginTop: 2 }}>{picker.label} · {DAY_NAMES[DAYS.indexOf(picker.day)]}</div>
              </div>
              <button onClick={() => setPicker(null)}
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", color: COLORS.muted, fontFamily: "inherit" }}>
                Cerrar
              </button>
            </div>
            {/* Meal options */}
            <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px" }}>
              {meals[picker.mealKey]?.map((meal, i) => (
                <button key={i} onClick={() => selectMeal(picker.day, picker.slotKey, meal)}
                  style={{ width: "100%", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10,
                    padding: "12px 14px", marginBottom: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{meal.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{meal.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>
                      {meal.macros.kcal} kcal · {meal.macros.prot}g prot · {meal.macros.carb}g carb
                      {meal.tupper && <span style={{ marginLeft: 6, color: COLORS.green }}>📦</span>}
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: COLORS.accent, flexShrink: 0 }}>›</span>
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
      <Card style={{ borderLeft: `3px solid ${COLORS.accent}` }}>
        <Label color={COLORS.accent}>📊 Progreso esperado</Label>
        {[
          { week: "Semanas 1–2", v: "−1 a −1.5 kg (mucho es agua)", c: COLORS.green },
          { week: "Semanas 3–4", v: "−0.8 a −1 kg/semana", c: COLORS.blue },
          { week: "Semanas 5–6", v: "−0.7 a −0.9 kg/semana", c: COLORS.orange },
          { week: "Semanas 7–8", v: "−0.5 a −0.8 kg (el cuerpo se adapta)", c: COLORS.red },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? `1px solid ${COLORS.cardBorder}` : "none" }}>
            <span style={{ fontSize: 13, color: COLORS.muted, fontStyle: "italic" }}>{r.week}</span>
            <span style={{ fontSize: 13, color: r.c, fontWeight: 700 }}>{r.v}</span>
          </div>
        ))}
        <div style={{ marginTop: 14, fontSize: 12, color: COLORS.muted, lineHeight: 1.7, fontStyle: "italic" }}>
          Si pierdes más de 1.2 kg/semana sostenido, añade 150 kcal en carbos. Si no pierdes nada en 2 semanas, reduce 100 kcal o añade una sesión de cardio suave.
        </div>
      </Card>
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

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.text }}>
      <div style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "24px 20px 0", background: COLORS.card }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: COLORS.accent, letterSpacing: 4, textTransform: "uppercase", fontStyle: "italic" }}>Plan de Corte</span>
            <span style={{ fontSize: 10, color: COLORS.muted }}>8 semanas · Media maratón</span>
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: 30, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>−8 KG EN 8 SEMANAS</h1>
          <p style={{ margin: "0 0 20px", color: COLORS.muted, fontSize: 13, fontStyle: "italic" }}>Déficit agresivo · Alta proteína · Fuerza + Running</p>
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                style={{ background: "none", border: "none", borderBottom: activeTab === i ? `2px solid ${COLORS.accent}` : "2px solid transparent",
                  color: activeTab === i ? COLORS.accent : COLORS.muted, padding: "10px 14px", fontSize: 12,
                  cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px" }}>
        {activeTab === 0 && <HabitsTracker />}
        {activeTab === 1 && <CalcPlan onUpdate={(d) => setUserTarget(d.target || null)} />}
        {activeTab === 2 && <MealsTab targetKcal={userTarget} />}
        {activeTab === 3 && <ShoppingTab />}
        {activeTab === 4 && <PlannerTab />}
        {activeTab === 5 && <WeekTab />}
        {activeTab === 6 && <DosDonts />}
      </div>
    </div>
  );
}
