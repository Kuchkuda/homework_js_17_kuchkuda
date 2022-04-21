$(function () {
    let timer;
    let num = [];
    let checkTrue = [];

    function shuffle(num) {
        return num.sort(() => Math.round(Math.random() * 100) - 50);
    }

    function render() {
        num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        shuffle(num);
        $('.blockPuzzle').empty()
        $('.resImg').empty()
        for (let i = 0; i < 16; i++) {
            num[i] = $(`<div class="wrapLeft text${num[i]}"><div id="block${num[i]}" class="leftChildren img${num[i]}"></div></div>`);
            $('.blockPuzzle').append(num[i]);
            checkTrue[i] = $(`<div id="block${i+1}" class="wrapRight wrapLeft idRes${i+1}"></div>`)
            $('.resImg').append(checkTrue[i]);
        };
    }
    render();
    sortable();
    let startTimerSortb = 0;

    function sortable() {
        $('.wrapLeft').sortable({
            containment: '.contain',
            connectWith: '.wrapRight',
            start: function () {
                startTimerSortb++;
                if (startTimerSortb === 1) {
                    startGame()
                } else {
                    startTimerSortb++;
                }
                $('.btnCheck').css({
                    backgroundColor: `green`,
                })
                $('.btnStart').css({
                    backgroundColor: `rgb(0, 80, 0)`,
                })
                $(".btnStart").prop('disabled', true);
                $(".btnCheck").prop('disabled', false);
                if (!this.className.includes('wrapLeft')) {
                    $(this).addClass('wrapLeft');
                }
            },
            update: function (e) {
                if ($(this).children().length === 1) {
                    $(this).removeClass('wrapRight');
                } else {
                    $(this).addClass('wrapRight')
                }
            },
        });
    }

    let step = 0;
    $('.btnStart').on('click', function () {
        startGame();
        $('.btnCheck').css({
            backgroundColor: `green`,
        })
        $('.btnStart').css({
            backgroundColor: `rgb(0, 80, 0)`,
        })
        $(".btnStart").prop('disabled', true);
        $(".btnCheck").prop('disabled', false);
    })
    $('.btnNew').on('click', function () {
        startTimerSortb = 0;
        render();
        sortable();
        $('.btnCheck').css({
            backgroundColor: `rgb(0, 80, 0)`,
        })
        $('.btnStart').css({
            backgroundColor: `green`,
        })
        console.log('asdasd');
        $('.time').text('00 : 00')
        step = 0;
        clearInterval(timer);
        $(".btnStart").prop('disabled', false);
        $(".btnCheck").prop('disabled', true);
    });
    $('.btnCheck').on('click', function () {
        $('.btnCheck').css({
            disabled: true,
        });
        $('.modelBox').css({
            display: 'block',
        });
        $('.block').css({
            display: 'flex',
        });

    })
    // btnClose in modal
    $('.btnClose').on('click', function () {
        $('.btnCheck').css({
            disabled: true,
        });
     
        $('.btnCheck').css({
            backgroundColor: `rgb(0, 80, 0)`,
        })
        $('.modelBox').css({
            display: 'none',
        });
        $('.btnResCheck').css({
            display: 'block',
        });

    })
    // btnClose in modal
    // btnCheck in modal
    $('.btnResCheck').on('click', function () {
        const result = checkTrue.filter((elem) => {
            if (elem.children()[0]) {
                if (elem[0].id === elem.children()[0].id) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        });
        if (result.length === 16) {
            $('.btnStart').css({
                backgroundColor: `rgb(0, 80, 0)`,
            })
            $('.btnStart').css({
                disabled: true,
            });
            // getS(".btnStart").disabled = true;
            $('.btnCheck').css({
                backgroundColor: `rgb(0, 80, 0)`,
            })
            $('.btnCheck').css({
                disabled: true,
            });
            $('.resultGame').css({
                display: 'flex',
            });
            $('.win').css({
                display: 'flex',
            });
            $('.block').css({
                display: 'none',
            });

            clearInterval(timer);
        } else {
            $('.btnStart').css({
                backgroundColor: `rgb(0, 80, 0)`,
            })
            $('.btnStart').css({
                disabled: true,
            });
         
            $('.btnCheck').css({
                backgroundColor: `rgb(0, 80, 0)`,
            })
            $('.btnCheck').css({
                disabled: true,
            });
            $('.resultGame').css({
                display: 'flex',
            });
            $('.lose').css({
                display: 'flex',
            });
            $('.block').css({
                display: 'none',
            });
         
            clearInterval(timer);
        }

        $('.btnCheck').css({
            backgroundColor: `rgb(0, 80, 0)`,
        })
        $('.btnCheck').css({
            disabled: true,
        });
       
    })
    $('.btnResNewGmae').on('click', function () {
        $('.lose').css({
            display: 'none',
        });
        $('.win').css({
            display: 'none',
        });
        $('.resultGame').css({
            display: 'none',
        });
        $('.modelBox').css({
            display: 'none',
        });
     
        startTimerSortb = 0;
        render();
        sortable();
        if ($(".btnStart").disabled) {
            clearInterval(timer);
        }
        $('.btnCheck').css({
            backgroundColor: `rgb(0, 80, 0)`,
        })
        $('.btnStart').css({
            backgroundColor: `green`,
        })
        $('.btnStart').css({
            disabled: false,
        });
        $('.btnStart').css({
            disabled: true,
        });
        $(".time").text('00 : 00');
        step = 0;
    })

    // btnCheck in modal
    // startGame
    function startGame() {
        timer = setInterval(() => {
            let setD = new Date(2020, 6, 6, 0, 0, 59, 0);
            let setDend = new Date(2020, 6, 6, 0, 0, `${step}`, 0);
            step += 1;
            let rizn = setD.getTime() - setDend.getTime();
            let mm = Math.floor((rizn % (1000 * 60 * 60)) / (1000 * 60));
            let ss = Math.floor((rizn % (1000 * 60)) / 1000);
            if (mm < 10) {
                mm = "0" + mm;
            }
            if (ss < 10) {
                ss = "0" + ss;
            }
            // time out

            if (ss < 1) {
                $('.btnResCheck').css({
                    display: 'none'
                });
                $('.modelBox').css({
                    display: 'block'
                });
                $(".checText").text('Its a pity, but you lost out');
                $(".time").text(`00 : 00`);
                clearInterval(timer);
            } else {
                $(".time").text(`${mm} : ${ss}`);
                $(".checText").text(`You still have time, you sure? ${mm} : ${ss}`);
            }
            //    time out
        }, 1000);
    }
    //startGame
})