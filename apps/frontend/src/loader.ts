export function setLoader(selector:string) {
    const element = document.querySelector(selector)
    const remove = () => {
        element?.remove()
    }
    const container = document.createElement('div')
    element?.append(container)
    return {
        remove
    }

}