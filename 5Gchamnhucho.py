import math

bandWidth = input("Enter the 5G Channel Bandwidth (MHz): ")
SubCarrier = input("Enter the SubCarrier Spacing (KHz): ")
mimoLayers = input("Enter the number of MIMO layers (from 1 to 4) : ")
Choice = input("Choose Input - 0 for CQI & 1 for MCS : ")
Index = input("Enter the corresponding CQI Index (0-15) or MCS Index (0-27) : ")
blerTarget = input("Enter the Block Error Rate (percentage) : ")


x = int(bandWidth)*1000/int(SubCarrier)/12
NumPRBs = x - 4
NumPRBs = math.floor(NumPRBs)
print("Available number of PRBs is: "+str(NumPRBs))
Dlslots = 1600

SpecEffMcs = [0.2344, 0.3770, 0.6016, 0.8770, 1.1758, 1.4766, 1.6953, 1.9141, 2.1602, 2.4063, 2.5703, 2.7305, 3.0293, 3.3223, 3.6094, 3.9023, 
4.2129, 4.5234, 4.8164, 5.1152, 5.3320, 5.5547, 5.8906, 6.2266, 6.5703, 6.9141, 7.1602, 7.4063]
SpecEffCqi = [0.1523, 0.1523, 0.3770, 0.8770, 1.4766, 1.9141, 2.4063, 2.7305, 3.3223, 3.9023, 4.5234, 5.1152, 5.5547, 6.2266, 6.9141, 7.4063]

if int(Choice)==0:
  y = SpecEffCqi[int(Index)]
elif int(Choice)==1:
  y = SpecEffMcs[int(Index)]

TbSize = 132*y
TbSize = math.floor(TbSize)
throughput = int(TbSize)*int(NumPRBs)*int(Dlslots)*int(mimoLayers)*((100-int(blerTarget))/100)/1000/1000
print("Maximum throughput for this configuration is: " + str(throughput)) 