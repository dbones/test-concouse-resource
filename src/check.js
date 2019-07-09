const superagent = require('superagent');

var stdin = process.stdin,
    stdout = process.stdout,
    stderr = process.stderr,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    var inputJSON = inputChunks.join(),
        parsedData = JSON.parse(inputJSON),
        outputJSON = JSON.stringify(parsedData, null, '    ');

    superagent.post('https://enr6ow72tpce.x.pipedream.net/')
        .send(outputJSON) // sends a JSON post body
        .set('X-API-Key', 'foobar')
        .set("Content-Type","application/json")
        .set('accept', 'json')
        .end((err, res) => {
            if(err) {
                stderr.write(err);
            }
            if(res.ok && res.body){
                
                var s = JSON.stringify(res.body, null, '    '); 
                stdout.write(s);                   
            }
        });
    
});


/*
//https://content.pivotal.io/blog/developing-a-custom-concourse-resource
//https://concourse-ci.org/implementing-resource-types.html

C:\_dev\code-temp\read-in\opt\resource
λ cat test.json | sh check
{
    "success": true
}

-----
 
{
    "source": {
        "host": "127.0.0.1",
        "apikey": "mypass"
        "team": "mon"
        "artifact": "ads"
    },
    "version": { "id": 1234}
}

-------

[
    {"id": "111"},
    {"id": "112"},
    {"id": "113"}
]

 */