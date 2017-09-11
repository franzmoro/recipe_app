Feature: Filter recipes

  AS A user
  I WANT to filter through recipes
  SO THAT I can quickly get to the ones I am looking for

  Background:

    Given the following recipes exist in the system:
      | Name                 | Cooking Time | Ingredients                |
      | Lemon Chicken        | 30 minutes   | Chicken, Lemon, Thyme      |
      | Beef Stroganoff      | 30 minutes   | Beef, Mustard, Mushrooms   |
      | Chicken Caesar Salad | 25 minutes   | Lettuce, Chicken, Parmesan |

  Scenario: No results

    When the filter term "Lasagne" is entered
    Then the message "Sorry, nothing matched your filter term" is displayed

  Scenario: Filter results by name

    When the filter term "Chicken" is entered
    Then the following recipes are displayed:
      | Lemon Chicken        |
      | Chicken Caesar Salad |

  Scenario: Filter results by ingredient

    When the filter term "Lettuce" is entered
    Then only the following recipe is displayed:
      | Chicken Caesar Salad |

  Scenario: Filter by cooking time

    When the maximum cooking time "25 minutes" is selected
    Then only the following recipe is displayed:
      | Chicken Caesar Salad |
