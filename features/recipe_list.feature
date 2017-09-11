Feature: Recipe list

  AS A user
  I WANT to find recipes
  SO THAT I can get inspiration for cooking

  Scenario: No recipes available

    When there are no recipes in the system
    Then the message "Sorry, we currently have no recipes for you" is displayed

  Scenario: One recipe available

    When the following recipes exist in the system:
      | Name          | Cooking Time | Main Ingredients      |
      | Lemon Chicken | 30 minutes   | Chicken, Lemon, Thyme |
    Then the recipe "Lemon Chicken"
    And the cooking time of "30 minutes"
    And the main ingredients are displayed:
      | Chicken |
      | Lemon   |
      | Thyme   |

  Scenario: Select a recipe

    When a recipe is selected
    Then I am taken to the recipe page

  Scenario: Multiple recipes

    When the following recipes exist in the system:
      | Name            | Cooking Time | Main Ingredients            |
      | Lemon Chicken   | 30 minutes   | Chicken, Lemon, Thyme       |
      | Beef Stroganoff | 30 minutes   | Beef, Mustard, Mushrooms    |
      | Caesar Salad    | 25 minutes   | Lettuce, Croutons, Parmesan |
    Then the recipes along with their cooking time and main ingredients are displayed:
      | Lemon Chicken   |
      | Beef Stroganoff |
      | Caesar Salad    |

  Scenario: Multiple pages of recipes

    When there are more than 10 recipes in the system
    Then only the first 10 recipes are shown

  Scenario: Navigating multiple pages of recipes

    When there are more than 10 recipes in the system
    Then page navigation elements are displayed
