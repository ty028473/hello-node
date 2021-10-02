# event loop 作業
程式 1: 請問以下執行結果為何？

    1-500 after

after 會在什麼數字後印出？

    500

為什麼？

    readData(0)->call stack ->console
    console.log("after")->call stack->console

程式 2: 請問以下執行結果為何？

    1-100 after 101->500

after 會在什麼數字後印出？
    
    100

為什麼？

    readData(0)->call stack setTimeout(被外包)  ->console 1-100
    console.log("after")->call stack->console after
    setTimeout(外包完)->task queue->even loop等 call stack 沒東西執行-> call stack->console 101-500