Feature: Login functionality

  Scenario: Successful login
    Given I navigate to the login page
    When I enter username and password
    And I click on login button
    Then I should see the shop page