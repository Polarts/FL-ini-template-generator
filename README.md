# FL INI Template Generator 

Generates a very basic template for INI structures in FL with types of their values. Currently limited to a certain extent. Still very buggy!

## Runtime Dependencies:

- Node.js

## Usage:

`node index "PATH\TO\FL\FOLDER"`

### Optional params: 
- `json` - export as JSON.

## Output:

`out/templates.ini` (or `.json` if you prefer)

## Supported output types:
- `int`
- `float`
- `string`
- `file_path.extension`
- comma-separated tuple with any of the above



