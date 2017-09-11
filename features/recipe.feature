Feature: Recipe

  AS A user
  I WANT details on an individual recipe
  SO THAT I am able to cook it

  Scenario: Recipe doesn't exists

    When a recipe is visited that cannot be found
    Then the message "Sorry, this recipe doesn't exist or may have been removed" is displayed

  Scenario: Recipe cooking time

    Given the system has the following recipe cooking times:
      | Recipe               | Cooking Time |
      | Lemon Chicken        | 30 minutes   |
      | Chicken Caesar Salad | 25 minutes   |
    When the "Lemon Chicken" recipe is visited
    Then the cooking time of "30 minutes" is displayed

  Scenario: Recipe image

    Given the system has the following recipe image:
      | Recipe        | Image URL                        |
      | Lemon Chicken | images/recipes/lemon_chicken.png |
    When the "Lemon Chicken" recipe is visited
    Then the image "images/recipes/lemon_chicken.png" is displayed

  Scenario: Recipe ingredients

    Given the system has the following recipe ingredients:
      | Recipe        | Quantity | Ingredient      |
      | Lemon Chicken | 4        | Chicken Breasts |
      | Lemon Chicken | 1 tsp    | Thyme           |
      | Lemon Chicken | 1        | Lemon           |
    When the "Lemon Chicken" recipe is visited
    Then the ingredients are listed:
      | 4 x Chicken Breasts |
      | 1 tsp Thyme         |
      | 1 x Lemon           |
