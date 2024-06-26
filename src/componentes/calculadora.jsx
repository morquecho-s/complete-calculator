import { useState, useEffect } from "react";
import { Boton } from "./botones";
import { ItemPanel } from "./itemPanel";
import { Controlador } from "./acciones/control_panel_operacion";
import * as c from "./constantes";
import { LocalStorage } from "./ayudas/localStorageManager";
const localStorageManager = new LocalStorage();
const controllador = new Controlador(ItemPanel, null, c.actions, localStorageManager);
export const Calculadora = ({ id = "calculadora-contenedor", icons = {} }) => {
    const [elements, setElements] = useState([])
    const [lastElementsInHistorial, setLastElementsInHistorial] = useState(localStorageManager.getHistory())
    const [history, set_history] = useState(localStorageManager.getAllHistory())
    const [view_elements, setViewElements] = useState(elements);
    const [iconsActionForHistory, _] = useState({
        [c.actions.exponente_al.cuadrado]: <img src={icons.alCuadrado} className="temp-icon-especial-action"></img>,
        [c.actions.raiz.cuadrada]: <img src={icons.raizCuadrada} className="temp-icon-especial-action"></img>,
    })
    const [resultDisbled, set_result_disbled] = useState(true);
    const [history_hidden, set_history_hidden] = useState(true);
    
    const addItem = (key, type, src, action) => {
        const dataBoton = {
            type: type,
            key: key,
            src: src,
            action: action
        }
        controllador.addItem(dataBoton, elements, setElements);
    }
    const deleteLastItem = () => {
        controllador.deleteItem(elements, setElements);
    }
    const clear = () => {
        controllador.clearPanel(setElements);
    };
    useEffect(() => { controllador.icons = icons }, [icons]);
    useEffect(() => {
        const new_elements = elements.map((item, index) => (
            <ItemPanel
                id={item.id}
                key={index + 1}
                type={item.type}
                src={item.src}
                action={item.action}
            >
                {item.key}
            </ItemPanel>
        ));
        new_elements.reverse()
        setViewElements(new_elements);

    }, [elements])
    useEffect(() => {
        set_result_disbled(!(elements.length > 0));
    }, [elements])
    useEffect(() => {
        set_history(localStorageManager.getAllHistory());
    },[lastElementsInHistorial])
    /*
    ! Mira la documentación para ver el formato de los ItemsPanel
    */
    return (
        <article id={id}>
            <section id="historial-completo" className={history_hidden===true?"hidden":""}>
                {[...history].reverse().map((item, index) => (
                    <div key={index} className="history-item">
                        {[...item].reverse().map((itemH, indexH) => (
                            <ItemPanel
                                id={itemH.id}
                                key={indexH + 1}
                                type={itemH.type}
                                src={iconsActionForHistory[itemH.action]}
                                action={itemH.action}
                            >
                                {itemH.key}
                            </ItemPanel>
                        ))}
                    </div>

                ))}
                <Boton
                id="boton-cerrar-history"
                onClick={()=>{
                    set_history_hidden(true);

                }}
                >
                    cerrar
                </Boton>
            </section>
            <section
                id="panel-historial"

            >
                <button
                    id="panel-historial-abrir"
                    
                    onClick={() => {
                        set_history_hidden(!history_hidden);
                    }}
                >
                    <img src={icons.historial} />
                </button>
                {
                    [...lastElementsInHistorial].reverse().map((item, index) => (
                        <ItemPanel
                            id={item.id}
                            key={index + 1}
                            type={item.type}
                            src={iconsActionForHistory[item.action]}
                            action={item.action}
                        >
                            {item.key}
                        </ItemPanel>
                    ))
                }
            </section>
            <section
                id="panel-operacion"
            >
                {view_elements}

            </section>

            <section id="panel-numerico">
                {/* fila 1 */}
                <Boton
                    type={'especial borradoCompleto'}
                    onClick={clear}

                >
                    <img src={icons.limpiar} className="temp-icon-especial-action"></img>

                </Boton>

                <button id="boton-func-especiales"

                    onClick={() => {
                        controllador.getRawOperation(elements);
                    }}
                >func. especiales</button>
                <Boton
                    type={'especial segmentacion'}
                    onClick={addItem}
                >
                    {"("}
                </Boton>
                <Boton
                    type={'especial segmentacion'}
                    onClick={addItem}
                >
                    {")"}
                </Boton>

                {/* fila 2 */}
                <Boton
                    type={'especial accion'}
                    // src={icons.alCuadrado}
                    action={c.actions.exponente_al.cuadrado}
                    onClick={addItem}


                >
                    <img src={icons.alCuadrado} className="temp-icon-especial-action"></img>

                </Boton>
                <Boton
                    action={c.actions.raiz.cuadrada}

                    type={'especial accion'}
                    // src={icons.raizCuadrada}
                    onClick={addItem}

                >
                    <img src={icons.raizCuadrada} className="temp-icon-especial-action"></img>
                </Boton>
                <Boton
                    type={'especial borrado'}
                    onClick={deleteLastItem}

                    src={icons.borrar}
                >

                </Boton>
                <Boton
                    type={'especial operacion'}
                    onClick={addItem}

                >
                    {"÷"}
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}
                >
                    7
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    8
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    9
                </Boton>
                <Boton
                    type={'especial operacion'}
                    onClick={addItem}

                >
                    x
                </Boton>
                {/* fila 3 */}
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    4
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    5
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    6
                </Boton>
                <Boton
                    type={'especial operacion'}
                    onClick={addItem}

                >
                    -
                </Boton>
                {/* fila 4 */}
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    1
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    2
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    3
                </Boton>
                <Boton
                    type={'especial operacion'}
                    onClick={addItem}

                >
                    +
                </Boton>
                {/* fila 5 */}
                <Boton
                    type={'especial accion'}
                    onClick={addItem}

                >
                    +/-
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    0
                </Boton>
                <Boton
                    type={'numerico'}
                    onClick={addItem}

                >
                    .
                </Boton>
                <Boton
                    type={'especial resultado'}
                    disabled={resultDisbled}
                    onClick={() => {
                        controllador.getResult(elements, setElements, setLastElementsInHistorial)
                       
                    }}

                >
                    =
                </Boton>
                {/* <footer>
                    <h2>Morquecho Soto Sergio Manuel</h2>
                </footer> */}
            </section>
        </article>
    )
}