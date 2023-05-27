const comandosPares=[
    {
        comandos:[
            "rivalidad"            
        ],
        parametros:[
            {
                orden:1,
                nombre:"rival 1",
                nota:"si no se especifica rival 2, se toma el streamer"
            },
            {
                orden:2,
                nombre:"rival 2",
                nota:"si no se especifica rival 2, se toma el rival 1"
            }
        ],
        rango:{
            min:0,
            max:100
        },
        adicionales:[
            {
                comando:"rivalidad",
                respuestas:[
                    {
                        min:20,
                        mensaje:"No se conocen, viven en ciudades distintas NotLikeThis."
                    },
                    {
                        min:40,
                        mensaje:"La única competencia que tienen es por oxígeno WhySoSerious."
                    },
                    {
                        min:60,
                        mensaje:"No se enfrentan muy seguido pero cuando lo hacen la tierra tiembla HungryPaimon."
                    },
                    {
                        min:80,
                        mensaje:"Compiten en todo y llevan cuenta de sus victorias y derrotas :(."
                    },
                    {
                        min:100,
                        mensaje:"Enemigos mortales, duelo a muerte con cuchillos DxCat BOP."
                    }
                ]
            }
        ]
    }
]
module.exports={comandosPares};