from time import sleep

def start():
    name = input('Món quà gửi:')
    for i in range(2):
     print('\t\t  i i i')
     sleep(1)
    print('\t :----------------------:')
    print('\t :    Happy    ++++     :') 
    sleep(1)
    print('\t :   ++++    Birthday   :')
    sleep(1)
    print(f'\t :    {name}     ++++    :')
    print('\t /______________________\ ')
    sleep(1)
    for i in range(3):
     print('\t :-:-:-:-:-:-:-:-:-:-:-: ')
     sleep(1)
    print('\t ________________________')
    sleep(1)
    for i in range(4):
     print("\t  ||  ||  ||  ||  ||  || ")
     sleep(.6)
    print('\t  ||  ||  ||  ||  ||  || ')
    sleep(.6)
    print('Đang gửi......')
    sleep(1)
    print('\n')
    print(f'Lời chúc cho {name}.....')
    sleep(3)
    print('\n')
    print('\t CHÚC KHÔNG BỊ CHÓ CẮN!! :)')
start()    