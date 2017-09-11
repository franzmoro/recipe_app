Feature: Star

  AS A user
  I WANT to star my favourite recipes
  SO THAT I can get back to my favourite recipes quickly

  Background:

    Given the following recipes exist in the system:
      | Name                 | Cooking Time | Main Ingredients           |
      | Lemon Chicken        | 30 minutes   | Chicken, Lemon, Thyme      |
      | Beef Stroganoff      | 30 minutes   | Beef, Mustard, Mushrooms   |
      | Chicken Caesar Salad | 25 minutes   | Lettuce, Chicken, Parmesan |

  Scenario: Star a recipe

    Given the user "Joe" exists in the system
    And he has no starred recipes
    When he stars the recipe "Beef Stroganoff"
    Then the system has the following starred recipes for "Joe":
      | Beef Stroganoff |

  Scenario: Unstar a recipe

    Given the user "Joe" exists in the system
    And he has the starred recipes:
      | Beef Stroganoff |
    When he unstars the recipe "Beef Stroganoff"
    Then the system has no starred recipes for "Joe"

  Scenario: No starred recipes

    Given the user "Joe" exists in the system
    And he has no starred recipes
    When he filters by starred recipes
    Then the message "Sorry, you don't currently have any starred recipes, get started by starring recipes you like" is displayed

  Scenario: Show only starred recipes

    Given the user "Joe" exists in the system
    And he has the starred recipes:
      | Beef Stroganoff |
    When he filters by starred recipes
    Then the recipe "Beef Stroganoff" is displayed
