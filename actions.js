const Regex = require('@companion-module/base')

module.exports = function(self){
    const sendOscMessage = (path, args) => {
        self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
        self.log('debug', `Sending Args ${JSON.stringify(args)}`)
        self.oscSend(self.config.host, self.config.port, path, args)
    }

self.setActionDefinitions({
    next_slide: {
        name: 'got to next slide',
        options: [
        ],
        callback: async (event) => {
            sendOscMessage('/next', [])
        },
    },
    prev_slide: {
        name: 'go to previous slide',
        options: [
        ],
        callback: async (event) => {
            sendOscMessage('/prev', [])
        },
    },
    go_to_slide: {
        name: 'go to the selected slide',
        options: [
            {
                type: 'textinput',
                label: 'Slide Number',
                id: 'slide',
                regex: Regex.UNSIGNED_INTEGER,
                useVariables: true,
            },
        ],
        callback: async (event) => {
            const slide = await self.parseVariablesInString(event.options.slide)
            self.log('debug', 'Sending go to slide ')
            sendOscMessage("/slide", [
                {
                    type: 'i',
                    value: parseInt(slide),
                },
            ])
        },
    }
})
}