-- =============================================================================
-- ~/.hammerspoon/init.lua
-- =============================================================================

-- -- ── Цвета (Gruvbox Dark) ──────────────────────────────────────────────────────
-- local C = {
--     bg     = { red = 0.11, green = 0.13, blue = 0.13, alpha = 0.97 },
--     yellow = { red = 0.98, green = 0.74, blue = 0.18, alpha = 1.0 },
--     orange = { red = 0.99, green = 0.50, blue = 0.10, alpha = 1.0 },
--     gray   = { red = 0.57, green = 0.51, blue = 0.45, alpha = 1.0 },
--     green  = { red = 0.72, green = 0.73, blue = 0.15, alpha = 1.0 },
--     aqua   = { red = 0.56, green = 0.75, blue = 0.49, alpha = 1.0 },
-- }

-- local FONT_NAME = "Inter"
-- local FONT_SIZE = 13

-- local function styled(text, color, size)
--     return hs.styledtext.new(tostring(text), {
--         font  = { name = FONT_NAME, size = size or FONT_SIZE },
--         color = color or C.yellow,
--     })
-- end

-- -- =============================================================================
-- -- КАЛЬКУЛЯТОР
-- -- =============================================================================
-- local function tryCalc(query)
--     if not query:match("^[%d%s%+%-%*/%.%^%(%)%%,mathsqrtfloorceillnlogpiexpabsmodfrandmaxmin]+$") then
--         return nil
--     end
--     local fn = load("return " .. query:gsub("%^", "**"))
--     if not fn then fn = load("return math." .. query) end
--     if fn then
--         local ok, result = pcall(fn)
--         if ok and type(result) == "number" then
--             if result == math.floor(result) and math.abs(result) < 1e15 then
--                 return tostring(math.floor(result))
--             else
--                 return string.format("%.8g", result)
--             end
--         end
--     end
--     return nil
-- end

-- -- =============================================================================
-- -- КЕШ ПРИЛОЖЕНИЙ
-- -- Строится один раз, обновляется по таймеру.
-- -- appName хранится как plaintext для быстрого поиска.
-- -- =============================================================================
-- local cachedApps = {}

-- local function buildAppCache()
--     local apps = {}
--     local seen = {}
--     local output = hs.execute(
--         "mdfind 'kMDItemContentType == \"com.apple.application-bundle\"' 2>/dev/null"
--     )
--     for path in output:gmatch("[^\n]+") do
--         if path ~= "" then
--             local name = path:match("([^/]+)%.app$")
--             local skip = path:find("/System/Library/", 1, true)
--                 or (path:find("/Library/", 1, true) and not path:find("Applications", 1, true))
--             if name and not seen[name] and not skip then
--                 seen[name] = true
--                 table.insert(apps, {
--                     text    = styled(name, C.yellow),
--                     subText = styled(path, C.gray, FONT_SIZE - 2),
--                     image   = hs.image.iconForFile(path),
--                     action  = "app",
--                     appName = name,
--                     path    = path,
--                 })
--             end
--         end
--     end
--     table.sort(apps, function(a, b) return a.appName < b.appName end)
--     cachedApps = apps
-- end

-- -- Строим сразу синхронно при загрузке
-- buildAppCache()
-- -- И обновляем каждые 5 минут
-- hs.timer.doEvery(300, buildAppCache)

-- -- =============================================================================
-- -- ПОИСК ФАЙЛОВ — асинхронный через hs.task
-- -- =============================================================================
-- local fileTask = nil

-- -- Поиск файлов запускается только если query начинается с "find "
-- local function parseFileQuery(query)
--     return query:match("^find%s+(.+)$")
-- end

-- local function searchFilesAsync(query, callback)
--     if fileTask then fileTask:terminate() end
--     local fileQuery = parseFileQuery(query)
--     if not fileQuery or #fileQuery < 2 then
--         callback({})
--         return
--     end

--     local trash = os.getenv("HOME") .. "/.Trash"
--     local cmd = string.format(
--         "mdfind -onlyin ~ 'kMDItemDisplayName == \"*%s*\"cdw' 2>/dev/null"
--         .. " | grep -v '%s'"
--         .. " | grep -v '/Library/'"
--         .. " | grep -v '^/System/'"
--         .. " | head -10",
--         fileQuery:gsub("'", ""),
--         trash
--     )

--     fileTask = hs.task.new("/bin/sh", function(code, stdout, stderr)
--         local results = {}
--         for path in stdout:gmatch("[^\n]+") do
--             if path ~= "" then
--                 local name = path:match("([^/]+)$") or path
--                 table.insert(results, {
--                     text    = styled(name, C.aqua),
--                     subText = styled(path, C.gray, FONT_SIZE - 2),
--                     image   = hs.image.iconForFile(path),
--                     action  = "file",
--                     path    = path,
--                 })
--             end
--         end
--         callback(results)
--     end, { "-c", cmd })

--     fileTask:start()
-- end

-- -- =============================================================================
-- -- ПОСТРОЕНИЕ CHOICES
-- -- =============================================================================
-- local function buildChoices(query, fileResults)
--     query = query or ""
--     fileResults = fileResults or {}
--     local choices = {}

--     -- Калькулятор
--     if query:match("^[%d%(]") or query:match("^math%.") then
--         local result = tryCalc(query)
--         if result then
--             table.insert(choices, {
--                 text    = styled("= " .. result, C.green),
--                 subText = styled("Enter — скопировать", C.gray, FONT_SIZE - 2),
--                 action  = "calc",
--                 result  = result,
--             })
--         end
--     end

--     -- Приложения — фильтрация по plaintext appName
--     if #query == 0 then
--         for _, item in ipairs(cachedApps) do
--             table.insert(choices, item)
--         end
--     else
--         local lq = query:lower()
--         for _, item in ipairs(cachedApps) do
--             if item.appName:lower():find(lq, 1, true) then
--                 table.insert(choices, item)
--             end
--         end
--     end

--     -- Файлы
--     for _, v in ipairs(fileResults) do
--         table.insert(choices, v)
--     end

--     if #choices == 0 and #query > 0 then
--         table.insert(choices, {
--             text    = styled("Ничего не найдено", C.gray),
--             subText = styled(query, C.orange, FONT_SIZE - 2),
--             action  = "none",
--         })
--     end

--     return choices
-- end

-- -- =============================================================================
-- -- ЛАУНЧЕР
-- -- =============================================================================
-- local launcher = hs.chooser.new(function(choice)
--     if not choice then return end
--     if choice.action == "app" then
--         hs.application.launchOrFocus(choice.appName)
--     elseif choice.action == "file" then
--         hs.execute(string.format('open "%s"', choice.path))
--     elseif choice.action == "calc" then
--         hs.pasteboard.setContents(choice.result)
--         hs.alert.show("Скопировано: " .. choice.result, 1.5)
--     end
-- end)

-- launcher:bgDark(true)
-- launcher:fgColor(C.yellow)
-- launcher:subTextColor(C.gray)
-- launcher:width(50)

-- launcher:queryChangedCallback(function(query)
--     -- Приложения из кеша — мгновенно
--     launcher:choices(buildChoices(query, {}))
--     -- Файлы догружаем асинхронно
--     searchFilesAsync(query, function(fileResults)
--         launcher:choices(buildChoices(query, fileResults))
--     end)
-- end)

-- =============================================================================
-- ХОТКЕИ
-- =============================================================================

-- hs.hotkey.bind({ "option" }, "space", function()
--     launcher:choices(buildChoices("", {}))
--     launcher:show()
-- end)

hs.hotkey.bind({ "cmd" }, "return", function()
    hs.application.launchOrFocus("Alacritty")
end)

hs.hotkey.bind({ "cmd" }, "e", function()
    hs.application.launchOrFocus("Zed")
end)

local clicking = false
local clickTimer = nil

hs.hotkey.bind({}, 'F1', function()
    clicking = not clicking
    if clicking then
        clickTimer = hs.timer.doEvery(0.1, function()
            hs.eventtap.leftClick(hs.mouse.absolutePosition())
        end)
    else
        if clickTimer then clickTimer:stop() end
    end
end)

-- =============================================================================
-- АВТОПЕРЕЗАГРУЗКА
-- =============================================================================
hs.pathwatcher.new(os.getenv("HOME") .. "/.hammerspoon/", function(files)
    for _, file in pairs(files) do
        if file:sub(-4) == ".lua" then
            hs.reload()
            return
        end
    end
end):start()

hs.notify.new({
    title           = "Hammerspoon",
    informativeText = "Config loaded",
    withdrawAfter   = 2,
}):send()
