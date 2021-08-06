import { useEffect, useState } from 'react'
import { useTransition } from '@react-spring/web'
import { useStore } from '../../../store/use-store'

/**
 * @param {Array} array containing items
 * @param {object} options grid options
 * @param {number} options.width grid width
 * @returns {{Function,Object,Function}} transitions, waitFor, triggerLeave
 */
export function useBoardTransitions (array, { width }) {

    const [items, setItems] = useState ([])
    const isLeaving = useStore ((state) => state.board.isLeaving)
    const resetLeave = useStore ((state) => state.board.resetLeave)
    const waitFor = useStore ((state) => state.animations.waitFor)

    const transitions = useTransition (items, {
        'from': { 'opacity': 0, 'x': width * 2 * -1 },
        'enter': { 'opacity': 1, 'x': 0 },
        'leave': { 'opacity': 0, 'x': width * 2 },
        'config': { 'mass': 5, 'tension': 500, 'friction': 100 },
        'trail': 300 / items.length,
    })

    // enter
    useEffect (() => {

        const t1 = setTimeout (() => {

            setItems (array)

        }, waitFor.board.enter)

        return () => clearTimeout (t1)

    }, [array, waitFor.board.enter])

    // leave
    useEffect (() => {

        if (!isLeaving) return

        setItems ([])

        const t1 = setTimeout (() => {

            resetLeave ()
            
        }, waitFor.card.flip + waitFor.board.leave + waitFor.board.enter)

        return () => clearTimeout (t1)

    }, [isLeaving, resetLeave, waitFor.board.enter, waitFor.board.leave, waitFor.card.flip])

    return { transitions }

}
