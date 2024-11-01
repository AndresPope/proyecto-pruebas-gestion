*** Settings ***
Library    SeleniumLibrary
Library    DatabaseLibrary
Library    DataDriver
Library    ScreenCapLibrary
Library    String
Library    DateTime

*** Variables ***
${BROWSER}    chrome
${URL}    http://localhost:3000
${IMPLICIT_WAIT}    10
${SCREENSHOT_DIR}    ${CURDIR}/../Results/screenshots
${VIDEO_DIR}    ${CURDIR}/../Results/videos

*** Keywords ***
Open Test Browser
    [Arguments]    ${browser}=${BROWSER}
    Open Browser    ${URL}    ${browser}
    Maximize Browser Window
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

Start Video Recording
    Start Video Recording    name=${TEST NAME}    folder=${VIDEO_DIR}

Stop Video Recording
    Stop Video Recording

Setup Test
    Start Video Recording
    Open Test Browser

Teardown Test
    Capture Page Screenshot
    Stop Video Recording
    Close Browser

Validate Alpha Only
    [Arguments]    ${text}
    Should Match Regexp    ${text}    ^[A-Za-z]+$

Validate Numeric Only
    [Arguments]    ${text}
    Should Match Regexp    ${text}    ^[0-9]+$

Validate Email Format
    [Arguments]    ${email}
    Should Match Regexp    ${email}    ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$

Validate Username Format
    [Arguments]    ${username}
    Should Match Regexp    ${username}    ^[A-Z][a-z]{6}[0-9]$

Validate Age Over 18
    [Arguments]    ${birth_date}
    ${current_date}=    Get Current Date
    ${age}=    Evaluate    (${current_date} - datetime.strptime('${birth_date}', '%Y-%m-%d')).days / 365.25
    Should Be True    ${age} >= 18