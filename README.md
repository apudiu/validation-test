1. pnpm i
2. run request `src/feeds/feeds.http` > `Create feed`
3. Should see following error
```json
  "formErrors": [],
  "fieldErrors": {
    "title": [
      "Title, Body and attachment can't be empty at the same time"
    ]
  }
```

Expected is pass the validation as one field is provided

I'm also looking for a solution to remove `dto.data` field.
so property from the dto can be accessd like `dt.field` instead of `dto.data.field`

Thanks
