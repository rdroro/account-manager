# Operation document type

`PUT /account-manager/_mapping/operation`

    "properties": {
      "account": {
        "properties": {
          "bank": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "id": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "name": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          }
        }
      },
      "checked": {
        "type": "boolean"
      },
      "date": {
        "type": "date"
      },
      "label": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "outgoing": {
        "type": "double"
      },
      "user": {
        "type": "long"
      }
    }
