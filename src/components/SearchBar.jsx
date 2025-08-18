import React from "react";
import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange, onSubmit }){

    const [text, setText] = useState(value || '')

    //如果外部属性变化，同步更新内部text
    useEffect(() => {
        setText(value || '')
    }, [value])


    //它是一个事件处理函数：用于拦截表单提交行为
    //e.preventDefault() 阻止表单的默认提交行为（防止页面刷新）在浏览器中，如果你写了一个 <form>，点击提交按钮，浏览器默认会尝试刷新页面或跳转，这在 React 里是我们绝对不想要的行为。
    //所以我们加上 e.preventDefault() 来告诉浏览器：我接管这个表单提交的行为了，你别乱动，我自己来处理。
    //当用户点击表单的提交按钮（<button type="submit">）时，执行这段逻辑
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(text.trim())
    }

    //{value && 这是一个条件渲染的按钮：当 value 存在（非空字符串）时，才显示这个按钮；点击后清空搜索框。
    //onChange('') 表示把搜索词设置为 空字符串，也就是清空。    
    //onChange 是你从外部（Home.jsx）传进来的一个函数，目的是更新搜索关键词。
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search posts..." 
            />
            <button type="submit">Search</button>
            {value && (
                <button type="button" onClick={() => onChange('')}>
                    Clear
                </button>
            )}
        </form>
    )
}
