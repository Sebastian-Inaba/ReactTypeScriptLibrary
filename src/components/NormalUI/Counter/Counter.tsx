import React, { useState } from 'react';
import style from './Counter.module.css';

interface CounterProps {
    initialCount?: number;
    className?: string;
    onCountChange?: (count: number) => void;
}

export const CounterComponent: React.FC<CounterProps> = ({ initialCount, className, onCountChange }) => {
    const [count, setCount] = useState<number>(initialCount || 1);

    function CounterUp() {
        setCount((count) => {
            const newCount = count + 1;
            onCountChange?.(newCount);
            return newCount;
        });
    }

    function CountDown() {
        setCount((count) => {
            const newCount = Math.max(count - 1, 1);
            onCountChange?.(newCount);
            return newCount;
        });
    }

    return (
        <div className={`${style.counterWrapper} ${className}`}>
            <button className={style.CounterComponentCounterUpButton} onClick={CounterUp}>
                +
            </button>
            <span className={style.CounterComponentSpan}>{count}</span>
            <button className={style.CounterComponentCounterDownButton} onClick={CountDown}>
                -
            </button>
        </div>
    );
};

/*

USE EXAMPLES:

// 1. Simple Counter 
// <CounterComponent initialCount={1}/>

// 2. Parent Controlled counter (shopping cart)
// interface Item {
//   id: number;
//   name: string;
//   price: number;
//   count: number;
// }
// 
// export const ShoppingCart = () => {
//   const [items, setItems] = useState<Item[]>([
//     { id: 1, name: "Apple", price: 2, count: 1 },
//     { id: 2, name: "Banana", price: 1, count: 2 },
//   ]);
// 
//   // Calculate total price dynamically
//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);
// 
//   return (
//     <div>
//       {items.map(item => (
//         <div key={item.id}>
//           <span>{item.name} - ${item.price} each</span>
//           <CounterComponent
//             initialCount={item.count}
//             onCountChange={(newCount) => {
//               // Update the item count in parent state
//               setItems(prev =>
//                 prev.map(i => i.id === item.id ? { ...i, count: newCount } : i)
//               );
//             }}
//           />
//           <span>Subtotal: ${item.price * item.count}</span>
//         </div>
//       ))}
// 
//       <h2>Total: ${totalPrice}</h2>
//     </div>
//   );
// };

*/
