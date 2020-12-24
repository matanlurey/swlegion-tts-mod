position = {x = 8, y = -7.78999996185303, z = 0}
rotation = {x = 0, y = 180, z = 0}

scripted = true
function onLoad(save_state)
    self.interactable = false
    self.setLock(true)
end

function onDestroy()
    newTable = self.clone({
        position     = self.getPosition(),
        snap_to_grid = false,
    })

    newTable.setPosition(self.getPosition())
end
