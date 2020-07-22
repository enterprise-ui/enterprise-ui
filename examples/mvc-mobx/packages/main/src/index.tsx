import React from 'react'

export const Routes = () => {
    let [lib, setLib] = React.useState(<div>loading</div>)
    setTimeout(async () => {
        const { Lib } = await import('./lib')
        setLib(<Lib/>)
    }, 1000)
    return (
        <div>
            {lib}
            main
        </div>
    )
}
