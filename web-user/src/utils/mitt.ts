import mitt from 'mitt'

// 用于处理事件监听和触发
// Mitt 的主要功能是提供了 on、off 和 emit 方法，分别用于添加事件监听器、移除事件监听器和触发事件
const emitter = mitt()

export default emitter
