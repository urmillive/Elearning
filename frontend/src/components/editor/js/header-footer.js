$(document).ready(function ()
{
    // Header animation Logic Start
    var lastScrollTop = 0;
    var animateLogo = false
    $(window).scroll(function (event)
    {
        var st = $(this).scrollTop();
        if (st > lastScrollTop && lastScrollTop >= 200)
        {
            animateLogo = true
            $(".header-main__logo").addClass("shrink")
            $(".header-main__logo svg:last-child").attr("aria-hidden", true)
            $(".header-main__logo svg:first-child").removeAttr("class", "normal")
            $(".header-main__logo svg:first-child").attr("class", "ready")
        } else if (lastScrollTop < 200 && animateLogo)
        {
            $(".header-main__logo").removeClass("shrink")
            $(".header-main__logo svg:first-child").removeAttr("class", "ready")
            $(".header-main__logo svg:first-child").attr("class", "normal")
            $(".header-main__logo svg:last-child").attr("aria-hidden", false)
        }
        lastScrollTop = st;
    });
    // for header
    $("body").on("click", `
    .header-main__list-item[data-expandable=true],
    .header-sidebar__list-item[data-expandable=true],
    .gfg-overlay,.header-main__profile,
    .hide-search`, function (e)
    {
        // e.preventDefault()
        e.stopPropagation();
        let $this = $(this)
        if ($this.hasClass("header-main__list-item"))
        {
            $(".header-main__list .header-main__list-item[data-expandable=true]").each(function ()
            {
                $(this).attr("aria-expanded", false).removeClass("selected")
                $(".mega-dropdown__list-item.selected").each(function ()
                {
                    $(this).removeClass("selected").attr("aria-expanded", false);
                })
            })
            $this.attr("aria-expanded", true).addClass("selected");
        }
        if ($this.hasClass("header-sidebar__list-item"))
        {
            let expanded = $this.attr("aria-expanded")
            $(".header-sidebar__list-item[data-expandable=true]").each(function ()
            {
                $(this).attr("aria-expanded", false).removeClass("selected")
            })
            if (expanded == "true")
            {
                $this.attr("aria-expanded", false).removeClass("selected");
                return
            }
            $this.attr("aria-expanded", true).addClass("selected");
        }
        if ($this.hasClass("gfg-overlay"))
        {
            $(".hamburger-menu").click()
        }
        if ($this.hasClass("header-main__profile"))
        {
            $this.toggleClass("selected")
        }
    })
    $("body").on("click", ".mega-dropdown__list-item", function (e)
    {
        e.stopPropagation()
        let $this = $(this)
        $this.parent(".mega-dropdown").children().each(function (e)
        {
            $(this).attr("aria-expanded", false).removeClass("selected")
            $(this).find(".mega-dropdown").children("[data-expandable=true]").each(function (e)
            {
                $(this).attr("aria-expanded", false).removeClass("selected")
            })
        })
        $this.attr("aria-expanded", true).addClass("selected")
    })
    // top notification and hamburger menu toggle
    $("body").on("click", ".header-top__times,.hamburger-menu", function (e)
    {
        let $target = $(this)
        if ($target.hasClass("header-top__times"))
        {
            localStorage.setItem("gfgRemoveTN", new Date().getTime())
        }
        if ($target.hasClass("hamburger-menu"))
        {
            e.preventDefault()
            $(".header-sidebar__wrapper").toggleClass("open")
            $("#gfg-overlay").toggleClass("display-none")
            if ($(this).find(".gfg-burger-1.open").length > 0)
            {
                $(this).children().removeClass("open")
                return
            }
            $(this).children().addClass("open")
            // close search if open
        }
    })
    $("body").on("click", ".dropdown-toggle", function (e)
    {
        if ($(this).next().next(".dropdown-menu").is(":visible"))
        {
            $(this).next().next(".dropdown-menu").hide();
        }
        else
        {
            $(this).next().next(".dropdown-menu").show();
        }
    })
    window.onclick = function (event)
    {
        if (event.target !== "header-main__list-item" && event.target !== "mega-dropdown__list-item")
        {
            $(".header-main__list-item[aria-expanded=true]").each(function (e)
            {
                $(this).attr("aria-expanded", false).removeClass("selected");
                $(".dropdown-menu").hide();
            })
        }
        if (event.target !== "header-main__profile")
        {
            $(".header-main__profile").removeClass("selected")
        }
    }

    const sidebarLogic = () =>
    {
        $("#sidebar-list").html("")
        let list = []
        let listTemplate = ""
        const makeTemplate = e =>
        {
            let parent = $(e).children("span").text()
            let childrens = []
            let isChildren = false
            let $child = $(e).children(".mega-dropdown").children("[data-child=true]")
            isChildren = $child.length ? true : false

            listTemplate += `<li class="header-sidebar__list-item" data-expandable=${ isChildren } aria-expanded="false"><span>${ parent }<i class="material-icons">keyboard_arrow_down</i></span>`
            if (isChildren)
            {
                listTemplate += `<ul class="mega-dropdown">`
            }
            $child.each(function ()
            {
                let $this = $(this)
                let child = {}
                if ($this.attr("data-expandable") === "true")
                {
                    child[ 'text' ] = $this.children("span").text()
                    child[ 'href' ] = "#"
                } else
                {
                    child[ 'text' ] = $this.children("a").text()
                    child[ 'href' ] = $this.children("a").attr("href");
                }
                childrens.push(child)
                listTemplate += `<li class="mega-dropdown__list-item">
                    <a href='${ child[ 'href' ] || "#" }'>${ child[ 'text' ] }</a>
                </li>`
            })
            listTemplate += isChildren ? `</ul>` : "";
            listTemplate += `</li>`
            list.push({
                parent,
                childrens
            })
        }
        $(".mega-dropdown__list-item[data-parent=true]").each(function (e)
        {
            makeTemplate($(this))
        })
        $(".header-main__list .header-main__list-item[data-parent=true]").each(function (e)
        {
            makeTemplate($(this))
        })
        $("#sidebar-list").append(listTemplate)
    }
    sidebarLogic()
    // End of Main Logic

    // here is the code to scroll to top when someone hit the scollBtn.
    $('.header--profile__dropdown').click(function ()
    {
        $(".header--dropdown__profile").toggleClass("header--dropdown__profile-open");
    });
    $("body").click(function (e)
    {
        if (!$(e.target).hasClass('header--dropdown__profile') && !$(e.target).parents('.header--dropdown__profile').length && !$(e.target).parents('.header--profile__dropdown').length)
        {
            $(".header--dropdown__profile").removeClass("header--dropdown__profile-open");
        }
        if (!$(e.target).hasClass('header--dropdown__trackmenu') && !$(e.target).parents('.header--dropdown__trackmenu').length && !$(e.target).hasClass('header--tracks__dropdown'))
        {
            $(".header--dropdown__trackmenu").hide();
        }
    });
    $(".header--nav__items--left .header--nav__item").each(function ()
    {
        var link = $(this).children('a').attr('href');
        var path = window.location.href;
        if (path.indexOf(link) != -1)
        {
            $(this).addClass('active');
            $(this).children('a').addClass('active');
        }
    });
    $(".header--tracks__dropdown").click(function ()
    {
        $(".header--dropdown__trackmenu").toggle();
    });
    $.ajax({
        type: "POST",
        url: "/ajax/fetchUserDetails.php",
        data: {},
        success: function (result)
        {
            var response = JSON.parse(result);
            if (response[ "status" ] == 1)
            {
                $('.header--user__avatar').attr("src", response[ "userProfieImage" ]);
                $('.header--username').html(response[ "userHandle" ]);
                $('.header--profile__link').attr("href", 'https://auth.geeksforgeeks.org/user/' + response[ "userHandle" ] + '/practice/');
            }
        }
    });
    // initialize tooltip.  
    $(function ()
    {
        if ($('[data-toggle="tooltip"]').length != 0)
        {
            $('[data-toggle="tooltip"]').tooltip();
        }
    });

    // new way to intialize tooltip for dynamic elements
    $('body').tooltip({
        selector: '[data-toggle=tooltip]'
    });

});

