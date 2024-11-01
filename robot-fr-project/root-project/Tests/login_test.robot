*** Settings ***
Resource          ../Resources/login_keywords.resource
Test Setup        Setup Test
Test Teardown     Teardown Test
Test Template     Validate Login Scenario

*** Test Cases ***    USERNAME        PASSWORD        EXPECTED_RESULT
Valid Login          Prueba1         Test1234        success
Invalid Username     prueba1         Test1234        error
Invalid Format       Test123         Test1234        error
Empty Fields         ${EMPTY}        ${EMPTY}        error

*** Keywords ***
Validate Login Scenario
    [Arguments]    ${username}    ${password}    ${expected_result}
    Run Keyword If    '${username}' != '${EMPTY}'    Validate Username Format    ${username}
    Attempt Login    ${username}    ${password}
    Run Keyword If    '${expected_result}' == 'success'    Login Should Succeed
    ...    ELSE    Verify Login Error Message    Invalid credentials