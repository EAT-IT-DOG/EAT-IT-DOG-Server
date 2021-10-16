# -*- coding: utf-8 -*-

from selenium import webdriver
import time
import sys

options = webdriver.ChromeOptions()

options.add_argument("headless")

driver = webdriver.Chrome('chromedriver.exe', options=options)

driver.get('https://www.google.com/maps')

driver.implicitly_wait(3)

myLocation = sys.argv[1] + sys.argv[2]

driver.find_element_by_xpath('//*[@id="searchboxinput"]').send_keys(myLocation)
driver.find_element_by_xpath('//*[@id="searchbox-searchbutton"]').click()
driver.find_element_by_xpath('//*[@id="searchboxinput"]').clear()
driver.find_element_by_xpath('//*[@id="searchboxinput"]').send_keys('동물병원')
driver.find_element_by_xpath('//*[@id="searchbox-searchbutton"]').click()


for i in range(1, 11, 2):
    try:
        driver.find_element_by_xpath(f'//*[@id="pane"]/div/div[1]/div/div/div[4]/div[1]/div['+ str(i) +']/div/a').click()#리스트 검색
    except:
        print("\nERROR\n")
        continue
    try:
        name = driver.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[1]/h1/span[1]').text # 이름
    except:
        print("\nERROR\n")
        continue
    address = driver.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[7]/div[1]/button/div[1]/div[2]/div[1]').text #주소
    driver.find_element_by_xpath('//*[@id="omnibox-singlebox"]/div[1]/div[1]/button').click() # 뒤로가기
    print("이름:" + name + "\n주소:" + address + "\n")

# scroll_list = driver.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[4]/div[1]')
# driver.execute_script("arguments[0].scrollTo(0, 500);", scroll_list)

driver.quit()