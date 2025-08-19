import React from "react";

//这是函数组件定义，接受外部传进来的 4 个 **props**：
export default function SortingControls({
    sortBy,
    sortOrder,
    onSortByChange,
    onSortOrderChange,
}) {

    return ( //显示文本 `Sort by:`，`&nbsp;` 是 HTML 的空格。
        <div>
            <label> 
                Sort by:&nbsp;
                <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="title">Title</option>
                    <option value="body">Body</option>
                    <option value="userId">User ID</option>
                </select>
            </label>

            &nbsp;&nbsp;

            <button onClick={onSortOrderChange}>
                Order: {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
        </div>
    )

}