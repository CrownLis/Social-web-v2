import { useEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useScroll = (parentRef: any, childRef: any, callback: any) => {

    const observer: any = useRef()

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                console.log('Intersecting')
                callback()
            }
        }, options)
        console.log(observer.current)
        observer.current.observe(childRef.current)

        return function () {
            observer.current.unobserve(childRef.current)
        }
    }, [callback])
}