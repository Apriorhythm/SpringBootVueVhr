package com.apriorhythm.vhr.service;

import com.apriorhythm.vhr.mapper.MenuMapper;
import com.apriorhythm.vhr.model.Hr;
import com.apriorhythm.vhr.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    MenuMapper menuMapper;

    public List<Menu> getMenusByHiId() {
        return menuMapper.getMenusByHiId(
                ((Hr) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
    }

//    @Cacheable
    public List<Menu> getAllMenusWithRole() {
        return menuMapper.getAllMenusWithRole();
    }

}
