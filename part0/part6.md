```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: [{content: "single page app does not reload the whole page", date: "2019-05-25T15:15:59.905Z"}]
    activate server
    server-->>browser: Status Code: 201 Created
    deactivate server

```
