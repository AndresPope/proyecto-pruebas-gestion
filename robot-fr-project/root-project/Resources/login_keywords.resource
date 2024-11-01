*** Settings ***
Resource    common.resource

*** Variables ***
${LOGIN_USERNAME_INPUT}    id=username
${LOGIN_PASSWORD_INPUT}    id=password
${LOGIN_BUTTON}    id=login-button
${LOGIN_ERROR_MESSAGE}    class=error-message

*** Keywords ***
Input Login Credentials
    [Arguments]    ${username}    ${password}
    Input Text    ${LOGIN_USERNAME_INPUT}    ${username}
    Input Text    ${LOGIN_PASSWORD_INPUT}    ${password}

Click Login Button
    Click Element    ${LOGIN_BUTTON}

Verify Login Error Message
    [Arguments]    ${expected_message}
    Element Should Contain    ${LOGIN_ERROR_MESSAGE}    ${expected_message}

Login Should Succeed
    Location Should Be    ${URL}/dashboard

Attempt Login
    [Arguments]    ${username}    ${password}
    Input Login Credentials    ${username}    ${password}
    Click Login Button